const { logger, outputArtifact, uploadArtifact } = require("../../utils")
const path = require("path");

const enabled = true;

const step = async ({ outputPath, version, scope, rootPath, s3Target }) => {

    if (!enabled) {
        return
    }

    logger.info("Compose Data step");
    await uploadArtifact("compose-data", cxt);
    await outputArtifact("compose-data", cxt);
}

module.exports = { step }