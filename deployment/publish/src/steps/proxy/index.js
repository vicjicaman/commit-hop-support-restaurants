const { logger, command } = require("../../utils")

const enabled = true;

const step = async ({ scope, version }) => {

    if (!enabled) {
        return
    }

    logger.info("Proxy step");
    await command(`docker image tag ua-wck-proxy:latest repoflow/ua-wck-proxy:${scope}-${version}`);
    await command(`docker push repoflow/ua-wck-proxy:${scope}-${version}`);
}

module.exports = { step }