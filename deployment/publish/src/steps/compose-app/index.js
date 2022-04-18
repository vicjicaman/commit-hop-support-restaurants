const { logger, outputArtifact, uploadArtifact } = require("../../utils")
const path = require("path");

const enabled = true;

const step = async (cxt) => {

    if (!enabled) {
        return
    }

    logger.info("Compose App step");
    await uploadArtifact("compose-app", cxt);
    await outputArtifact("compose-app", cxt);
}

module.exports = { step }