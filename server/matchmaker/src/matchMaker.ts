import moment from 'moment';
import discovery from './discovery';

interface MatchingResult {
  participants: string[];
  serverAddr: string;
}

interface Participant {
  username: string;
  joinTime: number;
  timeout: NodeJS.Timeout;
  promise: {
    resolve: (v: any) => void;
  };
}

const timeout = 30; // 30 seconds

class SimpleMatchMaker {
  private queue: Participant[] = [];

  addPlayer(username: string): Promise<MatchingResult> {
    return new Promise<MatchingResult>((resolve, reject) => {

      this.queue.push({
        username,
        joinTime: moment().unix(),
        promise: {
          resolve
        },
        timeout: setTimeout(() => {
          this.queue.splice(this.queue.findIndex(p => p.promise.resolve === resolve), 1);
          reject('timeout');
        }, timeout * 1000)
        
      });
    });
  }

  update() {
    if (this.queue.length <= 1) { return; }

    let length = Math.floor(this.queue.length / 2);
    for (let i = 0; i < length; i++) {
      let p1: Participant = this.queue.shift()!;
      let p2: Participant = this.queue.shift()!;

      clearTimeout(p1.timeout);
      clearTimeout(p2.timeout);

      let server = discovery.getIdleAndBind();
      let result: MatchingResult = {
        participants: [ p1.username, p2.username ],
        serverAddr: `${server.ipv4}:${server.port}`
      };

      console.log(`matching : ${JSON.stringify(result)}`);

      p1.promise.resolve(result);
      p2.promise.resolve(result);
    }  
  }
}

const instance = new SimpleMatchMaker();

setInterval(() => {
  instance.update();
}, 2000);

export default instance;