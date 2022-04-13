const { logger, command } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async ({ outputPath, version, scope, rootPath, s3Target }) => {

    if (!enabled) {
        return
    }

    logger.info("Formation step");
    const publicationOutput = `${outputPath}/formation`;
    const s3FormationTarget = `${s3Target}/formation`;
    await command(
        `aws s3 cp ${publicationOutput}/distribution-stack.json s3://${s3FormationTarget}/`
    );
    await command(
        `aws s3 cp ${publicationOutput}/backend-stack.json s3://${s3FormationTarget}/`
    );
}

module.exports = { step }