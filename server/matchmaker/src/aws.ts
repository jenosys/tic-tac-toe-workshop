import fs from 'fs';
import os from 'os';

import AWS from 'aws-sdk';
import env from './env';


if (env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY) {
  // automatic with enviroments
} else if (env.IS_IN_ECS) {
  // from ecs IAM role
} else if (fs.statSync(`${os.homedir()}/.aws/credentials`).isFile()) {
  // from ~/.aws/credentials
  let credentials = new AWS.SharedIniFileCredentials({ profile: 'container' });
  AWS.config.credentials = credentials;
}

if (!process.env.AWS_REGION) {
  AWS.config.update({ region: env.AWS_REGION });
}

export default AWS;