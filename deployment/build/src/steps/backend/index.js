const { logger, command, copyWithActiveSegment } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async ({ outputPath, rootPath, commonPath, componentsPath, libsPath }) => {

    if (!enabled) {
        return
    }


    logger.info("Backend step")
    const backendPath = path.join(rootPath, "backend")
    const backendOutputPath = path.join(outputPath, "backend", "output");
    await command(`rm -rf ${backendOutputPath}`);
    await command(`mkdir -p ${backendOutputPath}`);
    await command(`yarn install`, { cwd: backendPath });
    await command(`yarn run webpack --version`, { cwd: backendPath });
    await command(`yarn build`, { cwd: backendPath });
    //await command(`cp -r ${path.join(backendPath, "migrations")} ${path.join(backendOutputPath, "migrations")} `);
    await command(`cp ${path.join(backendPath, "package.json")} ${path.join(backendOutputPath, "package.json")} `);
    await command(`cp ${path.join(backendPath, "yarn.lock")} ${path.join(backendOutputPath, "yarn.lock")} `);
    await command(`yarn install --production`, { cwd: backendOutputPath });
    await command(`cp ${path.join(backendPath, "dist/index.js")} ${path.join(backendOutputPath, "index.js")} `);
    //await command(`cp ${path.join(backendPath, "Dockerfile")} ${path.join(backendOutputPath, "Dockerfile")} `);
    //await copyWithActiveSegment(`${path.join(backendPath, "Dockerfile")}`, `${path.join(backendOutputPath, "Dockerfile")}`, "prod");
    //await command(`docker build --no-cache -t ua-wck-backend .`, { cwd: backendOutputPath });


}

module.exports = { step }
