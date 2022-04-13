const { logger, command, getStackStatus, createStack, updateStack } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async (cxt) => {

    if (!enabled) {
        return
    }


    logger.info("Distribution formation step");

    const stackType = "distribution"
    const sinf = await getStackStatus(stackType, cxt);

    if (sinf === null) {
        await createStack(stackType, cxt)
    } else {
        await updateStack(stackType, cxt)
    }

}

module.exports = { step }

/*
,
                    "sync": {
                        "commands": {
                            "compose_app_sync": {
                                "command": {
                                    "Fn::Sub": "aws s3 sync s3://ua-wck-utils/${ScopeName}/${ScopeVersion}/compose-app /home/ec2-user/app/compose/app"
                                }
                            },
                            "compose_data_sync": {
                                "command": {
                                    "Fn::Sub": "aws s3 sync s3://ua-wck-utils/${ScopeName}/${ScopeVersion}/compose-data /home/ec2-user/app/compose/data"
                                }
                            },
                            "certificate": {
                                "command": "aws s3 sync s3://ua-wck-utils/certificates/ua-wck.com /home/ec2-user/app/compose/app/certificates/ua-wck.com"
                            }
                        }
                    },
                    "compose_data": {
                        "commands": {
                            "docker_compose_data": {
                                "command": "cd /home/ec2-user/app/compose/data; docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d"
                            }
                        }
                    },
                    "compose_app": {
                        "commands": {
                            "docker_compose_app": {
                                "command": "cd /home/ec2-user/app/compose/app; docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d"
                            }
                        }
                    }
*/