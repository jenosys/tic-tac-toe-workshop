import AWS from './aws';
import env from './env';
import discovery, { DediServer } from './discovery';


export class ContainerManager {

  private ecs: AWS.ECS;

  constructor() {
    this.ecs = new AWS.ECS({ apiVersion: '2014-11-13' });
  }


  ensureReadyTaskNumber(number: number) {
    let readyTasks = discovery.servers.filter(srv => srv.state === 'ready');
    let readyCount = readyTasks.length;

    if (number > readyCount) {
      return this.runTasks(number - readyCount);
    } else if (number < readyCount) {
      return this.stopTasks(readyTasks.randomPick(readyCount - number));
    }
  }

  runTasks(number: number) {
    if (number <= 0) { return; }

    let promises = [];

    while (number > 0) {
      let cnt = Math.min(number, 10);
      number -= cnt;

      let promise = this.ecs.runTask({
        taskDefinition: env.ECS_TASK_DEFINITION,
        cluster: env.ECS_CLUSTER_NAME,
        count: cnt
      }).promise();

      promises.push(promise);
    }

    return Promise.all(promises);
  }

  stopTasks(tasks: DediServer[]) {
    if (!tasks.length) { return; }

    let promise = Promise.all(
      tasks.map(task => {
        return this.ecs.stopTask({
          task: task.taskArn,
          cluster: env.ECS_CLUSTER_NAME,
          reason: 'too many tasks'
        }).promise();
      })
    );

    return promise;
  }
}

const instance = new ContainerManager();

export default instance;