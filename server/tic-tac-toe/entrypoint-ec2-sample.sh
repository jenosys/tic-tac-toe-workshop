#!/bin/bash

set -e

if [[ $ECS_CONTAINER_METADATA_URI ]]; then
    # is in ecs

    HOST_IP=$(curl --silent --connect-timeout 2 http://169.254.169.254/latest/meta-data/public-ipv4)

    META_RESULT=$(curl --silent --connect-timeout 2 ${ECS_CONTAINER_METADATA_URI}/task | jq -r '.Cluster, .TaskARN')
    CLUSTER=$(echo $META_RESULT | cut -f 1 -d ' ')
    TASK_ARN=$(echo $META_RESULT | cut -f 2 -d ' ')

    TASK_RESULT=$(aws ecs describe-tasks --cluster $CLUSTER --tasks $TASK_ARN | jq -r '.tasks[0].launchType, .tasks[0].taskDefinitionArn, .tasks[0].containers[0].networkBindings[0].hostPort')
    LAUNCH_TYPE=$(echo $TASK_RESULT | cut -f 1 -d ' ')
    TASK_DEFINITION=$(echo $TASK_RESULT | cut -f 2 -d ' ')
    HOST_PORT=$(echo $TASK_RESULT | cut -f 3 -d ' ')

    TASK_DEFINITION_RESULT=$(aws ecs describe-task-definition --task-definition $TASK_DEFINITION | jq -r '.taskDefinition.family, .taskDefinition.revision')
    FAMILY=$(echo $TASK_DEFINITION_RESULT | cut -f 1 -d ' ')
    REVISION=$(echo $TASK_DEFINITION_RESULT | cut -f 2 -d ' ')

    echo "CLUSTER: $CLUSTER"
    echo "TASK_ARN: $TASK_ARN"
    echo "HOST_IP: $HOST_IP"
    echo "HOST_PORT: $HOST_PORT"
    echo "LAUNCH_TYPE: $LAUNCH_TYPE"
    echo "FAMILY: $FAMILY"
    echo "REVISION: $REVISION"

    if [[ -z $CLUSTER || -z $TASK_ARN || -z $HOST_IP || -z $HOST_PORT  || -z $LAUNCH_TYPE || -z $FAMILY || -z $REVISION ]]; then
        exit -1
    fi

    export CLUSTER
    export TASK_ARN
    export HOST_IP
    export HOST_PORT
    export LAUNCH_TYPE
    export FAMILY
    export REVISION
fi

exec "$@"