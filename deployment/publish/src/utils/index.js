const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require('fs').promises;

const logger = { info: msg => console.log(msg), debug: msg => console.log(msg) }

const command = async (cmd, args, handler) => {

    logger.info(cmd);
    const res = await exec(cmd, args);
    logger.info(res.stdout);
    logger.info(res.stderr);

    if (handler) {
        await handler(res);
    }
}


const outputArtifact = async (stepName, cxt) => {
    const { outputPath, version, scope, rootPath, s3Target, artifactOutputPAth } = cxt;

    const sourcePath = path.join(outputPath, stepName);
    const targetPath = path.join(artifactOutputPAth, stepName);

    await exec(`mkdir -p ${artifactOutputPAth}`);
    await exec(`cp -r ${sourcePath}/*  ${targetPath}`);
}

const uploadArtifact = async (stepName, cxt) => {
    const { outputPath, version, scope, rootPath, s3Target } = cxt;

    const sourcePath = path.join(outputPath, stepName);
    const s3FormationTarget = `${s3Target}/${stepName}`;

    await command(`aws s3 sync ${sourcePath} s3://${s3FormationTarget}`);
}




module.exports = { logger, command, outputArtifact, uploadArtifact }