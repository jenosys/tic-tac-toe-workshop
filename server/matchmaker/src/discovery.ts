import axios from 'axios';
import interval from 'interval-promise';

import AWS from './aws';


export interface DediServer {
  id: string;
  ipv4: string;
  port: number;
  state: 'ready' | 'bind' | 'busy';
  taskArn: string;
  launchType: 'EC2' | 'FARGATE';
  image: string;
  status: 'unknown' | 'healthy' | 'unhealthy';
}

const NAMESPACE_NAME = 'tic-tac-toe';
const SERVICE_NAME = 'dedi-servers';


class Discovery {
  private sd: AWS.ServiceDiscovery;
  private nsId: string;
  private svcId: string;

  private _servers: DediServer[] = [];

  constructor() {
    this.sd = new AWS.ServiceDiscovery({ apiVersion: '2017-03-14' });
  }

  get servers() {
    return this._servers.slice(0);
  }

  get readyCount() {
    return this._servers.filter(srv => srv.state === 'ready').length;
  }

  get busyCount() {
    return this._servers.filter(srv => srv.state === 'busy').length;
  }

  async init() {
    let listNamespaces = await this.sd.listNamespaces({
      Filters: [
        {
          Name: 'TYPE',
          Values: [
            'HTTP'
          ],
          Condition: "EQ"
        }
      ]
    }).promise();

    let ns = listNamespaces.Namespaces!.find(ns => ns.Name === NAMESPACE_NAME);

    if (!ns) {
      throw `Not exist namespace(tic-tac-toe) in ServiceDiscovery`;
    }

    this.nsId = ns.Id!;

    let listServices = await this.sd.listServices({
      Filters: [
        {
          Name: 'NAMESPACE_ID',
          Values: [
            this.nsId
          ],
          Condition: "EQ"
        }
      ]
    }).promise();

    let svc = listServices.Services!.find(svc => svc.Name === SERVICE_NAME);

    if (!svc) {
      throw `Not exist service(dedi-servers) in ServiceDiscovery`;
    }

    this.svcId = svc.Id!;

    await this.refresh();

    interval(async () => {
      await this.refresh();
    }, 5000);
  }

  private async refresh() {
    let nextToken: string | undefined;
    let array: DediServer[] = [];

    // CloudMap 에서 현재 등록된 데디 서버 리스트를 얻어옵니다.
    try {
      do {
        let instances = await this.sd.listInstances({
          ServiceId: this.svcId,
          MaxResults: 100,
          NextToken: nextToken
        }).promise();

        instances.Instances!.forEach(ins => {
          array.push({
            id: ins.Id!,
            ipv4: ins.Attributes!.AWS_INSTANCE_IPV4,
            port: parseInt(ins.Attributes!.AWS_INSTANCE_PORT),
            state: ins.Attributes!.STATE as DediServer['state'],
            launchType: ins.Attributes!.LAUNCH_TYPE as DediServer['launchType'],
            taskArn: ins.Attributes!.TASK_ARN,
            image: ins.Attributes!.IMAGE,
            status: 'unhealthy'
          });
        });

      } while (nextToken);

    } catch (e) {
      console.error(e);
    }

    let mixedArray = await Promise.all(
      array.map(srv => new Promise<DediServer | undefined>(resolve => {
        axios.get(`http://${srv.ipv4}:${srv.port}/health`, { timeout: 2000 })
          .then(() => {
            srv.status = "healthy";
            resolve(srv);
          })
          .catch(error => {
            srv.status = 'unhealthy';
            resolve(srv);

            console.error(error);
            console.log(`dedi server(${srv.ipv4}:${srv.port}) doesn't respond`);
          });
      }))
    );

    this._servers = mixedArray as DediServer[];
  }

  getIdleAndBind() {
    let selected = this._servers.randomPick(1)[0];

    this._servers.splice(this._servers.indexOf(selected), 1);
    this.updateState(selected, 'bind');

    return selected;
  }

  private updateState(server: DediServer, state: 'ready' | 'busy' | 'bind') {
    let promise = this.sd.registerInstance({
      Attributes: {
        'AWS_INSTANCE_IPV4': server.ipv4,
        'AWS_INSTANCE_PORT': server.port.toString(),
        'TASK_ARN': server.taskArn,
        'DEFINITION': server.image,
        'STATE': state,
        'LAUNCH_TYPE': server.launchType
      },
      InstanceId: server.id,
      ServiceId: this.svcId
    }).promise();

    return promise;
  }

  remove(server: DediServer) {
    this.sd.deregisterInstance({
      InstanceId: server.id,
      ServiceId: this.svcId
    }, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      }
    });
  }
}


let instance = new Discovery();

export default instance;