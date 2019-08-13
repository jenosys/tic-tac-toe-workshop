interface Env {
  NODE_ENV: 'production' | 'development';
  IS_IN_ECS: boolean;

  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;

  HOST_IP: string;
  PORT: string;
  HOST_PORT: string;

  TASK_ARN: string;
  CLUSTER?: string;
  LAUNCH_TYPE: string;
  IMAGE: string;
}

const env: Env = {
  NODE_ENV: (process.env.NODE_ENV || 'development') as Env['NODE_ENV'],
  IS_IN_ECS: !!process.env.ECS_CONTAINER_METADATA_URI,
  
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  
  HOST_IP: process.env.HOST_IP || '127.0.0.1',
  PORT: process.env.PORT || "3553",
  HOST_PORT: process.env.HOST_PORT || "3553",

  TASK_ARN: process.env.TASK_ARN || 'local instance',
  CLUSTER: process.env.CLUSTER,
  LAUNCH_TYPE: process.env.LAUNCH_TYPE || 'local',
  IMAGE: process.env.FAMILY ? `${process.env.FAMILY}:${process.env.REVISION}` : 'local:1'
};

export default env;