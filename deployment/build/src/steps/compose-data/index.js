const { logger, command, renderTemplate } = require("../../utils")
const path = require("path");

const enabled = true;

const step = async ({ outputPath, rootPath, scope, version }) => {

    if (!enabled) {
        return
    }

    logger.info("Compose app step")
    const sourcePath = path.join(rootPath, "compose/data")
    const targetPath = path.join(outputPath, "compose-data");
    await command(`rm -rf ${targetPath}`);
    await command(`mkdir -p ${targetPath}`);

    const basefile = path.join(sourcePath, "docker-compose.yml")
    await renderTemplate(`${basefile}`, `${basefile}`, { scope, version })
    const prodfile = path.join(sourcePath, "docker-compose.prod.yml")
    await renderTemplate(`${prodfile}`, `${prodfile}`, { scope, version })

}

module.exports = { step }
