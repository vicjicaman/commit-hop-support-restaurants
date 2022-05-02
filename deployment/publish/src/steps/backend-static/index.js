const { logger, command } = require("../../utils")

const enabled = true;

const step = async (cxt) => {
    const { outputPath, s3Target } = cxt;

    if (!enabled) {
        return
    }

    logger.info("Backend static step");
    //await command(`docker image tag ua-wck-backend-static:latest repoflow/ua-wck-backend-static:${scope}-${version}`);
    //await command(`docker push repoflow/ua-wck-backend-static:${scope}-${version}`);

}

module.exports = { step }