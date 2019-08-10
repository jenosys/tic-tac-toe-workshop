interface Env {
  NODE_ENV: 'production' | 'development';
  IS_IN_ECS: boolean;

  AWS_REGION: string;
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;


  HOST: string;
  PORT: string;
  HOST_PORT: string;
}

const env: Env = {
  NODE_ENV: (process.env.NODE_ENV || 'development') as Env['NODE_ENV'],
  IS_IN_ECS: !!process.env.ECS_CONTAINER_METADATA_URI,
  AWS_REGION: process.env.AWS_REGION || 'ap-northeast-2',

  HOST: process.env.HOST_IP || '127.0.0.1',
  PORT: process.env.PORT || "3553",
  HOST_PORT: process.env.PORT_TCP_3553 || "3553",
};

export default env;