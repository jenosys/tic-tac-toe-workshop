import AWS from 'aws-sdk';
import env from './env';


if (env.NODE_ENV === 'development') {
  let credentials = new AWS.SharedIniFileCredentials({ profile: 'container' });
  AWS.config.credentials = credentials;  
}

AWS.config.update({ region: env.REGION });

const NAMESPACE_NAME = 'tic-tac-toe';
const SERVICE_NAME = 'dedi-servers';

const serviceDiscovery = new AWS.ServiceDiscovery({ apiVersion: '2017-03-14' });
let namespaceId = '';
let serviceId = '';
const instanceId = `${env.HOST}-${env.HOST_PORT}`;
let registered = false;

export async function register() {
  let listNamespaces = await serviceDiscovery.listNamespaces({
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

  const ns = listNamespaces.Namespaces!.find(ns => ns.Name === NAMESPACE_NAME);

  if (!ns) {
    throw `Not exist namespace(tic-tac-toe) in ServiceDiscovery`;
  }
  namespaceId = ns.Id!;


  let listServices = await serviceDiscovery.listServices({
    Filters: [
      {
        Name: 'NAMESPACE_ID',
        Values: [
          namespaceId
        ],
        Condition: "EQ"
      }
    ]
  }).promise();

  let svc = listServices.Services!.find(svc => svc.Name === SERVICE_NAME);

  if (!svc) {
    throw `Not exist service(dedi-servers) in ServiceDiscovery`;
  }

  serviceId = svc.Id!;

  await serviceDiscovery.registerInstance({
    Attributes: {
      'AWS_INSTANCE_IPV4': env.HOST,
      'AWS_INSTANCE_PORT': env.HOST_PORT,
      'State': 'READY'
    },
    InstanceId: instanceId,
    ServiceId: serviceId
  }).promise();

  registered = true;

  console.log('regisgtered on CloudMap');
}

export function deregister() {
  if (registered) {
    let promise = serviceDiscovery.deregisterInstance({
      InstanceId: instanceId,
      ServiceId: serviceId
    }).promise();
    
    promise.then(() => {
      registered = false;
      console.log('deregistered on CloudMap');
    });

    return promise;
  }
}

export function updateState(state: string) {
  serviceDiscovery.registerInstance({
    Attributes: {
      'AWS_INSTANCE_IPV4': env.HOST,
      'AWS_INSTANCE_PORT': env.HOST_PORT,
      'State': state
    },
    InstanceId: instanceId,
    ServiceId: serviceId
  }).promise();
}