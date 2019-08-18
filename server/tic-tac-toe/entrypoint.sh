#!/bin/bash

set -e

if [[ $ECS_CONTAINER_METADATA_URI ]]; then
    # launched in ecs
    META_RESULT=$(curl --silent --connect-timeout 2 ${ECS_CONTAINER_METADATA_URI}/task | jq -r '.Cluster, .TaskARN')
    CLUSTER=$(echo ${META_RESULT} | cut -f 1 -d ' ')
    TASK_ARN=$(echo ${META_RESULT} | cut -f 2 -d ' ')

    LAUNCH_TYPE=$(aws ecs describe-tasks --cluster ${CLUSTER} --tasks ${TASK_ARN} | jq -r '.tasks[0].launchType')
    TASK_DEFINITION=$(aws ecs describe-tasks --cluster ${CLUSTER} --tasks ${TASK_ARN} | jq -r '.tasks[0].taskDefinitionArn')

    TASK_DEFINITION_RESULT=$(aws ecs describe-task-definition --task-definition $TASK_DEFINITION | jq -r '.taskDefinition.family, .taskDefinition.revision')
    FAMILY=$(echo $TASK_DEFINITION_RESULT | cut -f 1 -d ' ')
    REVISION=$(echo $TASK_DEFINITION_RESULT | cut -f 2 -d ' ')

    if [[ $LAUNCH_TYPE = "EC2" ]]; then
        # ec2
        HOST_IP=$(curl --silent --connect-timeout 2 http://169.254.169.254/latest/meta-data/public-ipv4)
        HOST_PORT=$(aws ecs describe-tasks --cluster ${CLUSTER} --tasks ${TASK_ARN} | jq -r '.tasks[0].containers[0].networkBindings[0].hostPort')
    else
        # fargate
        ENI=$(aws ecs describe-tasks --cluster ${CLUSTER} --tasks ${TASK_ARN} | jq -r '.tasks[0].attachments[0].details[] | select(.name == "networkInterfaceId") | .value')
        HOST_IP=$(aws ec2 describe-network-interfaces --network-interface-ids $ENI | jq -r '.NetworkInterfaces[0].PrivateIpAddresses[0].Association.PublicIp')
        HOST_PORT=$(aws ecs describe-task-definition --task-definition $TASK_DEFINITION | jq -r .taskDefinition.containerDefinitions[0].portMappings[0].hostPort)
    fi


    echo "CLUSTER: $CLUSTER"
    echo "TASK_ARN: $TASK_ARN"
    echo "HOST_IP: $HOST_IP"
    echo "HOST_PORT: $HOST_PORT"
    echo "LAUNCH_TYPE: $LAUNCH_TYPE"
    echo "FAMILY: $FAMILY"
    echo "REVISION: $REVISION"

    export CLUSTER
    export TASK_ARN
    export HOST_IP
    export HOST_PORT
    export LAUNCH_TYPE
    export FAMILY
    export REVISION
fi

exec "$@"
