const { logger, command, buildParamTemplate } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async ({ outputPath, rootPath, commonPath, componentsPath, libsPath, scope, version }) => {

    if (!enabled) {
        return
    }


    logger.info("Application step")
    const applicationPath = path.join(rootPath, "application")
    const applicationOutputPath = path.join(outputPath, "application");
    await command(`rm -rf ${applicationOutputPath}`);
    await command(`mkdir -p ${applicationOutputPath}`);

    //await command(`cp -r ${applicationPath} ${applicationOutputPath} `);

    const params = { "SCOPExNAME": scope, "SCOPExVERSION": version };
    await buildParamTemplate(
        path.join(applicationPath, "appspec.yml"),
        applicationOutputPath,
        params
    );

    await buildParamTemplate(
        path.join(applicationPath, "script.sh"),
        applicationOutputPath,
        params
    );
}

module.exports = { step }
