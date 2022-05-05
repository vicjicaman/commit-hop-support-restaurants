const { logger, command, outputArtifact } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async (cxt) => {
    const { outputPath, s3Target } = cxt;

    if (!enabled) {
        return
    }

    logger.info("Origin request step");

    const buildOutputPath = `${outputPath}/origin-request`
    const s3OriginTarget = `${s3Target}/origin-request`;

    await command(
        `zip -r -q ../payload.zip ./* `, { cwd: `${buildOutputPath}/code` }
    );

    await command(
        `aws s3 cp ${buildOutputPath}/payload.zip s3://${s3OriginTarget}/`
    );

    await outputArtifact("origin-request", cxt);

}

module.exports = { step }
//ua-wck-utils