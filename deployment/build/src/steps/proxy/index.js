const { logger, command, copyWithActiveSegment } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async ({ outputPath, rootPath, commonPath, componentsPath, libsPath }) => {

    if (!enabled) {
        return
    }

    logger.info("Proxy step")
    const sourcePath = path.join(rootPath, "nginx")
    const targetPath = path.join(outputPath, "proxy");
    await command(`rm -rf ${targetPath}`);
    await command(`mkdir -p ${targetPath}`);
    await command(`mkdir -p ${path.join(targetPath, "sites")}`);

    await copyWithActiveSegment(`${path.join(sourcePath, "Dockerfile")}`, `${path.join(targetPath, "Dockerfile")}`, "prod");
    await copyWithActiveSegment(`${path.join(sourcePath, "sites", "*.ua-wck.com.conf")}`, `${path.join(targetPath, "sites", "*.ua-wck.com.conf")}`, "prod");
    await copyWithActiveSegment(`${path.join(sourcePath, "nginx.conf")}`, `${path.join(targetPath, "nginx.conf")}`, "prod");

    await command(`docker build --no-cache -t ua-wck-proxy .`, { cwd: targetPath });
}

module.exports = { step }
