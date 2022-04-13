const { logger, command } = require("../../utils")
const path = require("path");

const enabled = true;

const step = async ({ outputPath, version, scope, rootPath, s3Target }) => {

    if (!enabled) {
        return
    }

    logger.info("Compose App step");
    const publicationOutput = `${outputPath}/compose-app`;
    const s3FormationTarget = `${s3Target}/compose-app`;
    await command(`aws s3 sync ${publicationOutput} s3://${s3FormationTarget}`);
}

module.exports = { step }