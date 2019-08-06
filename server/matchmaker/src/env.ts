import internalIp from 'internal-ip';

import assert from 'assert';

let localIP = internalIp.v4.sync();

console.log(localIP);

const ENV = {
    VERSION: "0.0.1",
    LOCALIP: localIP,
    PRODUCTION: process.env.NODE_ENV === 'production',

    ECS_CLUSTER_ENDPOINT: process.env.ECS_CLUSTER_ENDPOINT!,                            //
    ECS_TASK_DEFINITION: process.env.ECS_TASK_DEFINITION!,                              // external-ip:8

    ZOOKEEPER_ENDPOINT: process.env.ZOOKEEPER_ENDPOINT || localIP + ":2181",            // 

    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,

    validate: function() {
        assert.ok(!!ENV.ECS_CLUSTER_ENDPOINT,   "ECS_CLUSTER_ENDPOINT must be set");
        assert.ok(!!ENV.ECS_TASK_DEFINITION,    "ECS_TASK_DEFINITION must be set");
        assert.ok(!!ENV.AWS_ACCESS_KEY_ID,      "AWS_ACCESS_KEY_ID must be set");
        assert.ok(!!ENV.AWS_SECRET_ACCESS_KEY,  "AWS_SECRET_ACCESS_KEY must be set");
    }
}

export default ENV;