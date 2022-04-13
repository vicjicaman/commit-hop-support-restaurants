const { logger, commandSSM, getStackStatus, createStack, updateStack, wait } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async (cxt) => {

    if (!enabled) {
        return
    }

    logger.info("Backend formation step");

    const { scope, version, rootPath, certificateARN, hostedZoneId, s3Target } = cxt;
    const stackType = "backend"
    const { outputs } = await getStackStatus(stackType, cxt);
    
    await commandSSM(outputs.BackendInstanceId, `aws s3 sync s3://ua-wck-utils/${scope}/${version}/compose-data /home/ec2-user/app/compose/data`);
    await commandSSM(outputs.BackendInstanceId, `aws s3 sync s3://ua-wck-utils/${scope}/${version}/compose-app /home/ec2-user/app/compose/app`);
    await commandSSM(outputs.BackendInstanceId, `aws s3 sync s3://ua-wck-utils/certificates/ua-wck.com /home/ec2-user/app/compose/app/certificates/ua-wck.com`);

    logger.info("Compose update")

    await commandSSM(outputs.BackendInstanceId, `cd /home/ec2-user/app/compose/data; docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`);
    await commandSSM(outputs.BackendInstanceId, `cd /home/ec2-user/app/compose/app; docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`);
}

module.exports = { step }