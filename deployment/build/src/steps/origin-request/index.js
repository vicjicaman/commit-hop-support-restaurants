const { logger, command, copyWithActiveSegment } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async ({ outputPath, rootPath }) => {

    if (!enabled) {
        return
    }

    const name = "origin-request";
    logger.info(`${name} step`)
    const sourcePath = path.join(`${path.join(rootPath, "distribution")}`, name)
    const buildOutputPath = path.join(outputPath, name, "code");
    await command(`rm -rf ${buildOutputPath}`);
    await command(`mkdir -p ${buildOutputPath}`);
    await command(`yarn install`, { cwd: sourcePath });
    await command(`yarn build`, { cwd: sourcePath });
    await command(`cp ${path.join(sourcePath, "package.json")} ${path.join(buildOutputPath, "package.json")} `);
    await command(`cp ${path.join(sourcePath, "yarn.lock")} ${path.join(buildOutputPath, "yarn.lock")} `);
    await command(`yarn install --production`, { cwd: buildOutputPath });
    await command(`cp ${path.join(sourcePath, "dist/index.js")} ${path.join(buildOutputPath, "index.js")} `);

}

module.exports = { step }
