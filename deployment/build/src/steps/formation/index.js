const { logger, command, buildParamTemplate } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");
const md5 = require("md5");

const enabled = true;

const step = async ({ outputPath, rootPath, commonPath, componentsPath, libsPath, version }) => {

    if (!enabled) {
        return;
    }

    logger.info("Formation step")
    const formationPath = path.join(rootPath, "formation")
    const formationOutputPath = path.join(outputPath, "formation");

    await command(`rm -rf ${formationOutputPath}`);
    await command(`mkdir -p ${formationOutputPath}`);

    const versionHash = md5(version);
    logger.info("Version hash " + versionHash);

    await buildParamTemplate(
        path.join(formationPath, "distribution-stack.json"),
        formationOutputPath,
        { "SCOPExVERSIONxHASH": versionHash })

    await buildParamTemplate(
        path.join(formationPath, "backend-stack.json"),
        formationOutputPath,
        { "SCOPExVERSIONxHASH": versionHash })

}

module.exports = { step }