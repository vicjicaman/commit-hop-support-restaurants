const { logger, command, copyWithActiveSegment } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async ({ outputPath, rootPath, commonPath, componentsPath, libsPath }) => {

    if (!enabled) {
        return
    }


    logger.info("Backend proxy step")
    const sourcePath = path.join(rootPath, "backend-static-proxy")
    const targetPath = path.join(outputPath, "backend-static-proxy", "output");
    await command(`rm -rf ${targetPath}`);
    await command(`mkdir -p ${targetPath}`);
    await command(`yarn install`, { cwd: sourcePath });
    await command(`yarn build`, { cwd: sourcePath });
    //await command(`cp -r ${path.join(sourcePath, "migrations")} ${path.join(targetPath, "migrations")} `);
    await command(`cp ${path.join(sourcePath, "package.json")} ${path.join(targetPath, "package.json")} `);
    await command(`cp ${path.join(sourcePath, "yarn.lock")} ${path.join(targetPath, "yarn.lock")} `);
    await command(`yarn install --production`, { cwd: targetPath });
    await command(`cp ${path.join(sourcePath, "dist/index.js")} ${path.join(targetPath, "index.js")} `);
    //await command(`cp ${path.join(sourcePath, "Dockerfile")} ${path.join(targetPath, "Dockerfile")} `);
    //await copyWithActiveSegment(`${path.join(sourcePath, "Dockerfile")}`, `${path.join(targetPath, "Dockerfile")}`, "prod");
    //await command(`docker build --no-cache -t ua-wck-backend .`, { cwd: targetPath });


}

module.exports = { step }
