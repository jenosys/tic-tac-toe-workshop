import axios from 'axios';

import AWS from './aws';
import env from './env';


const NAMESPACE_NAME = 'tic-tac-toe';
const SERVICE_NAME = 'dedi-servers';

const serviceDiscovery = new AWS.ServiceDiscovery({ apiVersion: '2017-03-14' });
let namespaceId = '';
let serviceId = '';
const instanceId = `${env.HOST}-${env.HOST_PORT}`;
let registered = false;

async function getMyTaskInfo() {
  if (env.IS_IN_ECS) {
    let res = await axios.get(`${process.env.ECS_CONTAINER_METADATA_URI}/task`, {
      timeout: 1000,
    });

    return res.data;
  } else {
    return {
      TaskARN: '+82-2-1577-1577'
    }
  }
}

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

  let taskInfo = await getMyTaskInfo();

  let promise = serviceDiscovery.registerInstance({
    Attributes: {
      'AWS_INSTANCE_IPV4': env.HOST,
      'AWS_INSTANCE_PORT': env.HOST_PORT,
      'STATE': 'ready',
      'TASK_ARN': taskInfo.TaskARN
    },
    InstanceId: instanceId,
    ServiceId: serviceId
  }).promise();

  promise.then(() => {
    registered = true;

    console.log('regisgtered on CloudMap');
  });

  return promise;
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

export function updateState(state: 'ready' | 'busy') {
  let promise = serviceDiscovery.registerInstance({
    Attributes: {
      'AWS_INSTANCE_IPV4': env.HOST,
      'AWS_INSTANCE_PORT': env.HOST_PORT,
      'STATE': state
    },
    InstanceId: instanceId,
    ServiceId: serviceId
  }).promise();

  promise.then(() => {
    console.log('updated on CloudMap');
  });

  return promise;
}