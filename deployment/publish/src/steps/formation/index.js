const { logger, uploadArtifact, outputArtifact  } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async (cxt) => {

    if (!enabled) {
        return
    }

    logger.info("Formation step");
    await uploadArtifact("formation", cxt);
    await outputArtifact("formation", cxt);
}

module.exports = { step }