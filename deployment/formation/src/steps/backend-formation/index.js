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
    const sinf = await getStackStatus(stackType, cxt);

    if (sinf === null) {
        await createStack(stackType, cxt)
    } else {
        await updateStack(stackType, cxt)
    }

   }

module.exports = { step }