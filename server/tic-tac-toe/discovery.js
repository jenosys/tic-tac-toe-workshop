const AWS = require('aws-sdk');
const env = require('./env');


let credentials = new AWS.SharedIniFileCredentials({ profile: 'container' });
AWS.config.credentials = credentials;
AWS.config.update({ region: 'ap-northeast-2' });

const NAMESPACE_NAME = 'tic-tac-toe';
const SERVICE_NAME = 'dedi-servers';

let serviceDiscovery = new AWS.ServiceDiscovery({ apiVersion: '2017-03-14' });
let namespaceId = '';
let serviceId = '';
let instanceId = `${env.host}-${env.hostPort}`;

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

  const ns = listNamespaces.Namespaces.find(ns => ns.Name === NAMESPACE_NAME);

  if (!ns) {
    throw `Not exist namespace(tic-tac-toe) in ServiceDiscovery`;
  }
  namespaceId = ns.Id;


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

  let svc = listServices.Services.find(svc => svc.Name === SERVICE_NAME);

  if (!svc) {
    throw `Not exist service(dedi-servers) in ServiceDiscovery`;
  }

  serviceId = svc.Id;

  await serviceDiscovery.registerInstance({
    Attributes: {
      'AWS_INSTANCE_IPV4': env.host,
      'AWS_INSTANCE_PORT': env.hostPort,
      'State': 'READY'
    },
    InstanceId: instanceId,
    ServiceId: serviceId
  }).promise();

  console.log('regisgtered on CloudMap');
}

export async function deregister() {
  await serviceDiscovery.deregisterInstance({
    InstanceId: instanceId,
    ServiceId: serviceId
  }).promise();

  console.log('deregistered on CloudMap');
}

export function updateState(state) {
  serviceDiscovery.registerInstance({
    Attributes: {
      'AWS_INSTANCE_IPV4': env.host,
      'AWS_INSTANCE_PORT': env.hostPort,
      'State': state
    },
    InstanceId: instanceId,
    ServiceId: serviceId
  }).promise();
}