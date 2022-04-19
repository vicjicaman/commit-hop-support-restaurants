const { logger, command, outputArtifact } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async (cxt) => {
    const { outputPath, version, scope, s3Target } = cxt;

    if (!enabled) {
        return
    }

    logger.info("Frontend step");

    const frontendOutput = `${outputPath}/frontend/build`
    const s3FrontendTarget = `${s3Target}/frontend`;

    await command(
        `aws s3 sync --cache-control 'max-age=31536000' --exclude index.html ${frontendOutput} s3://${s3FrontendTarget}`
    );

    await command(
        `aws s3 cp --cache-control 'max-age=60' ${frontendOutput}/index.html s3://${s3FrontendTarget}/`
    );

    await outputArtifact("frontend", cxt);
}

module.exports = { step }
//ua-wck-utils