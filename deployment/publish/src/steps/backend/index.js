const { logger, command } = require("../../utils")

const enabled = true;

const step = async ({ scope, version }) => {

    if (!enabled) {
        return
    }

    logger.info("Backend step");
    //await command(`docker image tag ua-wck-backend:latest repoflow/ua-wck-backend:${scope}-${version}`);
    //await command(`docker push repoflow/ua-wck-backend:${scope}-${version}`);
}

module.exports = { step }