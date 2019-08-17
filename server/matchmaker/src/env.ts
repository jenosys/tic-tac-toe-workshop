interface Env {
    NODE_ENV: 'production' | 'development';
    IS_IN_ECS: boolean;

    AWS_REGION: string;
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;

    ECS_CLUSTER_NAME: string;
    ECS_TASK_DEFINITION: string;
}

const env: Env = {
    NODE_ENV: (process.env.NODE_ENV || 'development') as Env['NODE_ENV'],
    IS_IN_ECS: !!process.env.ECS_CONTAINER_METADATA_URI,
    AWS_REGION: process.env.AWS_REGION || 'us-west-2',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,

    ECS_CLUSTER_NAME: process.env.ECS_CLUSTER_NAME || 'tic-tac-toe-cluster',
    ECS_TASK_DEFINITION: process.env.ECS_TASK_DEFINITION || 'tic-tac-toe-server',
};

export default env;