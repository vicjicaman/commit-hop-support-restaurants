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


const copyWithActiveSegment = async (filename, outputFilename, block = "prod", cxt) => {
    const BLOCK_START = "#BLOCK|";
    const data = await fs.readFile(filename, 'utf8');
    const lines = data.split("\n");
    const res = []

    const ctrl = { type: null }
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (!ctrl.inBlock && line.indexOf(BLOCK_START) !== -1) {
            const [, type] = line.split("|");
            ctrl.type = type;
        }
        else if (ctrl.type && line.indexOf(`#${ctrl.type}`) !== -1) {
            ctrl.type = null;
        } else {
            if (ctrl.type) {
                if (ctrl.type === block) {
                    res.push(line.slice(1));
                } else {
                    //show inactive blocks
                    //res.push(`#${line}`);
                }
            } else {
                res.push(line)
            }
        }

    }

    //const result = data.replace(/string to be replaced/g, 'replacement');
    await fs.writeFile(outputFilename, res.join("\n"), 'utf8');

}

module.exports = { logger, command, copyWithActiveSegment }