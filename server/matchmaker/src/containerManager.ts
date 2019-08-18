import moment from 'moment';
import interval from 'interval-promise';
import AWS from './aws';
import env from './env';
import discovery, { DediServer } from './discovery';
import { sleep } from './util';


export class ContainerManager {

  private ecs: AWS.ECS;
  private _desiredIdleNumber: number = -1;
  private lastPromise?: Promise<any> = undefined;
  private trackingTaskArns: string[] = [];

  constructor() {
    this.ecs = new AWS.ECS({ apiVersion: '2014-11-13' });

    interval(async () => {
      if (this.lastPromise) { return; }
      if (this.trackingTaskArns.length > 0) {
        let allStarted = await this.checkTasksAreStarted(this.trackingTaskArns);

        if (allStarted) {
          this.trackingTaskArns = [];

          await sleep(moment.duration(10, 'seconds').asMilliseconds());
        }

        return;
      }

      this.ensureIdleNumber();
    }, moment.duration(5, 'seconds').asMilliseconds());
  }

  get desiredIdleNumber() {
    return this._desiredIdleNumber;
  }

  set desiredIdleNumber(value: number) {
    this._desiredIdleNumber = value;
  }


  private ensureIdleNumber() {
    if (this._desiredIdleNumber <= 0) { return; }
    if (this.lastPromise || this.trackingTaskArns.length > 0) { return; }

    let readyTasks = discovery.servers.filter(srv => srv.state === 'ready' && srv.status === 'healthy');
    let readyCount = readyTasks.length;

    if (this._desiredIdleNumber > readyCount) {
      let newTaskNumber = this._desiredIdleNumber - readyCount;
      console.log(`run new task. desired number: ${this.desiredIdleNumber} current number: ${readyCount} will make number: ${newTaskNumber}`);

      let promise = this.runTasks(newTaskNumber);
      // } else if (number < readyCount) {
      //   promise = this.stopTasks(readyTasks.randomPick(readyCount - number), 'too many idle servers');

      if (promise) {
        this.lastPromise = promise;
        promise.then((results: AWS.ECS.RunTaskResponse[]) => {

          this.lastPromise = undefined;

          let taskArns: string[] = [];

          results.forEach(result => {
            if (result.tasks) {
              taskArns = taskArns.concat(
                result.tasks.filter(t => !!t).map(t => t.taskArn!)
              );
            }
          });

          this.trackingTaskArns = taskArns;
        }).catch(error => {
          console.error(error);
          this.lastPromise = undefined;
        });

        return promise;
      }
    }
  }

  private async checkTasksAreStarted(taskArns: string[]) {
    let response = await this.ecs.describeTasks({
      cluster: env.ECS_CLUSTER_NAME,
      tasks: taskArns
    }).promise();

    let pendingTaskCount = response.tasks!.filter(t => {
      let lastState = t.lastStatus!;

      if (lastState === 'RUNNING' || lastState === 'STOPPED') {
        return true;
      }

      return false;
    }).length;

    return pendingTaskCount > 0;
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

  stopTask(task: DediServer, reason?: string) {
    return this.stopTasks([task]);
  }

  stopTasks(tasks: DediServer[], reason?: string) {
    if (!tasks.length) { return; }

    let promise = Promise.all(
      tasks.map(task => {
        return this.ecs.stopTask({
          task: task.taskArn,
          cluster: env.ECS_CLUSTER_NAME,
          reason: reason || 'unspecified'
        }).promise();
      })
    );

    return promise;
  }
}

const instance = new ContainerManager();

export default instance;