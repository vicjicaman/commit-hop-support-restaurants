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

module.exports = { logger, command }