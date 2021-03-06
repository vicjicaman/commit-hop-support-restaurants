const { logger, command, outputArtifact } = require("../../utils")

const enabled = true;

const step = async (cxt) => {
    const { outputPath, s3Target } = cxt;

    if (!enabled) {
        return
    }

    logger.info("Backend step");
    //await command(`docker image tag ua-wck-backend:latest repoflow/ua-wck-backend:${scope}-${version}`);
    //await command(`docker push repoflow/ua-wck-backend:${scope}-${version}`);


    const currentAsset = "backend";

    const buildOutputPath = `${outputPath}/${currentAsset}`
    const s3OriginTarget = `${s3Target}/${currentAsset}`;

    await command(
        `zip -q -r ../payload.zip ./* `, { cwd: `${buildOutputPath}/output` }
    );

    await command(
        `aws s3 cp ${buildOutputPath}/payload.zip s3://${s3OriginTarget}/`
    );

    await outputArtifact(currentAsset, cxt);
}

module.exports = { step }