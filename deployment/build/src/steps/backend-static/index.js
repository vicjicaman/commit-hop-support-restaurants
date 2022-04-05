const { logger, command, copyWithActiveSegment } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async ({ outputPath, rootPath, commonPath, componentsPath, libsPath }) => {

    if (!enabled) {
        return
    }


    logger.info("Backend static step")
    const backendStaticPath = path.join(rootPath, "backend-static")
    const backendStaticOutputPath = path.join(outputPath, "backend-static");
    await command(`rm -rf ${backendStaticOutputPath}`);
    await command(`mkdir -p ${backendStaticOutputPath}`);
    await command(`mkdir -p ${backendStaticOutputPath}/.next`);
    await command(`yarn install`, { cwd: backendStaticPath });
    await command(`yarn build`, { cwd: backendStaticPath });
    await command(`cp -r ${path.join(backendStaticPath, ".next")} ${path.join(backendStaticOutputPath)}`);
    await command(`cp -r ${path.join(backendStaticPath, "public")} ${path.join(backendStaticOutputPath)}`);
    await command(`cp ${path.join(backendStaticPath, "package.json")} ${path.join(backendStaticOutputPath, "package.json")} `);
    await command(`cp ${path.join(backendStaticPath, "yarn.lock")} ${path.join(backendStaticOutputPath, "yarn.lock")} `);
    await command(`cp ${path.join(backendStaticPath, "next.config.js")} ${path.join(backendStaticOutputPath, "next.config.js")} `);
    await command(`yarn install --production`, { cwd: backendStaticOutputPath });
    await copyWithActiveSegment(`${path.join(backendStaticPath, "Dockerfile")}`, `${path.join(backendStaticOutputPath, "Dockerfile")}`, "prod");
    await command(`docker build --no-cache -t ua-wck-backend-static .`, { cwd: backendStaticOutputPath });


}

module.exports = { step }