const { logger, command } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async ({ scope, s3Target }) => {

    if (!enabled) {
        return
    }

    logger.info("Frontend step");
    const s3VersionSource = `${s3Target}/frontend`;
    const s3ScopeTarget = `${scope}.ua-wck.com`;

    await command(
        `aws s3 sync  s3://${s3VersionSource} s3://${s3ScopeTarget}`
    );

}

module.exports = { step }
//ua-wck-utils