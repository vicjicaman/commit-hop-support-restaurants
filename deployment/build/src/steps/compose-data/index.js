const { logger, command, renderTemplate } = require("../../utils")
const path = require("path");

const enabled = true;

const step = async ({ outputPath, rootPath, scope, version }) => {

    if (!enabled) {
        return
    }

    logger.info("Compose data step")
    const sourcePath = path.join(rootPath, "compose/data")
    const targetPath = path.join(outputPath, "compose-data");
    await command(`rm -rf ${targetPath}`);
    await command(`mkdir -p ${targetPath}`);

    const basefile = "docker-compose.yml"
    await renderTemplate(path.join(sourcePath, basefile), path.join(targetPath, basefile), { scope, version })
    const prodfile = "docker-compose.prod.yml"
    await renderTemplate(path.join(sourcePath, prodfile), path.join(targetPath, prodfile), { scope, version })

}

module.exports = { step }
