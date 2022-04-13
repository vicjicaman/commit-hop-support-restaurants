const { logger, command } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async ({ outputPath, version, scope, s3Target }) => {

    if (!enabled) {
        return
    }

    logger.info("Frontend step");

    const buildOutputPath = `${outputPath}/origin-request`
    const s3OriginTarget = `${s3Target}/origin-request`;

    await command(
        `zip -r ../payload.zip ./* `, { cwd: `${buildOutputPath}/code` }
    );

    await command(
        `aws s3 cp ${buildOutputPath}/payload.zip s3://${s3OriginTarget}/`
    );

}

module.exports = { step }
//ua-wck-utils