const { logger, outputArtifact, uploadArtifact } = require("../../utils")
const path = require("path");

const enabled = true;

const step = async (cxt) => {

    if (!enabled) {
        return
    }

    logger.info("Application step");
    await uploadArtifact("application", cxt);
    await outputArtifact("application", cxt);
}

module.exports = { step }