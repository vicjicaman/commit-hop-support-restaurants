const { logger, command } = require("../../utils")

const enabled = true;

const step = async ({ outputPath, s3Target }) => {

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
        `zip -r ../payload.zip ./* `, { cwd: `${buildOutputPath}` }
    );

    await command(
        `aws s3 cp ${buildOutputPath}/payload.zip s3://${s3OriginTarget}/`
    );

    await outputArtifact(currentAsset, cxt);
}

module.exports = { step }