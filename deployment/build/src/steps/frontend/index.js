const { logger, command } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async ({ outputPath, rootPath, componentsPath, scope }) => {

    if (!enabled) {
        return
    }

    logger.info("Frontend step")
    const frontendPath = path.join(rootPath, "frontend")
    const frontendCommonPath = path.join(frontendPath, "src", "common");
    const frontendOutputPath = path.join(outputPath, "frontend");
    await command(`rm -rf ${frontendOutputPath}`);
    await command(`mkdir -p ${frontendOutputPath}`);
    await command(`mkdir -p ${frontendCommonPath}`);
    await command(`cp -r ${componentsPath}/* ${frontendCommonPath}`);
    await command(`yarn install`, { cwd: frontendPath });
    await command(`REACT_APP_SCOPE=${scope} yarn build`, { cwd: frontendPath });
    await command(`mv ${path.join(frontendPath, "build")} ${frontendOutputPath}`);

}

module.exports = { step }