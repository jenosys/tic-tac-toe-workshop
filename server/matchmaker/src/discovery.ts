import AWS from 'aws-sdk';
import axios from 'axios';

interface DediServer {
  id: string;
  ipv4: string;
  port: number;
  state: string;
}

const NAMESPACE_NAME = 'tic-tac-toe';
const SERVICE_NAME = 'dedi-servers';

let credentials = new AWS.SharedIniFileCredentials({profile: 'container'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'ap-northeast-2'});

class Discovery {
  private sd: AWS.ServiceDiscovery;
  private nsId: string;
  private svcId: string;

  servers: DediServer[] = [];

  constructor() {
    this.sd = new AWS.ServiceDiscovery({ apiVersion: '2017-03-14' });
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

    setInterval(() => this.refresh(), 5000);
  }

  async refresh() {
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
            state: ins.Attributes!.State || 'Not set'
          });
        });

      } while (nextToken);

    } catch (e) {
      console.error('error ', e);
    }

    console.log(array);

    let mixedArray = await Promise.all(
      array.map(srv => new Promise<DediServer | undefined>(resolve => {
        axios.get(`http://${srv.ipv4}:${srv.port}/health`, { timeout: 2000 })
          .then(() => {
            resolve(srv);
          })
          .catch(error => {
            resolve();

            // 응답 하지 않는 데디 서버를 CloudMap에서 지웁니다.            
            this.sd.deregisterInstance({
              InstanceId: srv.id,
              ServiceId: this.svcId
            });

            console.log(`dedi server(${srv.id}, ${srv.ipv4}:${srv.port}) doesn't respond`);
          });
      }))
    );

    this.servers = mixedArray.filter(elem => !!elem) as DediServer[];

    console.log(JSON.stringify(this.servers));
  }
}


let instance = new Discovery();

export default instance;