const path = require("path");
const util = require("util");
const _ = require("lodash");
const exec = util.promisify(require("child_process").exec);
const fs = require('fs').promises;

const logger = { info: msg => console.log(msg), error: msg => console.log(msg), debug: msg => console.log(msg) }

function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

const command = async (cmd, args) => {

    logger.info(cmd);
    const res = await exec(cmd, args);
    logger.info(res.stdout);
    logger.info(res.stderr);

    return res;
}

const buildStackUpdate = (stackType, verb, { scope, version, hostedZoneId, certificateARN }) => `aws cloudformation ${verb}-stack --stack-name ua-wck-${stackType}-${scope} \
--template-url https://ua-wck-utils.s3.amazonaws.com/${scope}/${version}/formation/${stackType}-stack.json \
--parameters ParameterKey=ScopeName,ParameterValue=${scope} \
ParameterKey=ScopeVersion,ParameterValue=${version} \
ParameterKey=ApexDomainName,ParameterValue=ua-wck.com \
ParameterKey=HostedZoneId,ParameterValue=${hostedZoneId} \
ParameterKey=AcmCertificate,ParameterValue=${certificateARN} \
--capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM`;


const createStack = async (stackType, cxt) => {
    await exec(buildStackUpdate(stackType, "create", cxt));

    await waitForStatus(stackType, "CREATE_COMPLETE", cxt)
}

const updateStack = async (stackType, cxt) => {

    try {
        await exec(buildStackUpdate(stackType, "update", cxt));

        await waitForStatus(stackType, "UPDATE_COMPLETE", cxt)
    } catch (e) {

        if (e.message.indexOf("No updates are to be performed") !== -1) {
            console.log("Stack up to date.");
        } else {
            throw e;
        }
    }

}


const getStackStatus = async (stackType, { scope, version, hostedZoneId, certificateARN }) => {

    try {
        const res = await exec(`aws cloudformation describe-stacks --stack-name ua-wck-${stackType}-${scope}`);
        const strRes = res.stdout.toString()
        const inf = JSON.parse(strRes);

        //logger.debug(JSON.stringify(inf.Stacks[0], null, 2))
        return {
            status: inf.Stacks[0].StackStatus,
            outputs: _.reduce(inf.Stacks[0].Outputs, (res, val) => {
                res[val.OutputKey] = val.OutputValue;
                return res;
            }, {})
        };
    } catch (e) {
        logger.error(e.toString());
        return null;
    }
}

const waitForStatus = async (stackType, target, cxt) => {

    while (true) {
        const { status } = await getStackStatus(stackType, cxt)

        if (status === target) {
            break;
        }

        logger.info(`current status:${status}`)
        logger.info(`waiting for status:${target}`)
        await wait(5000);
    }
}




const commandSSM = async (instanceid, command, opts = { comment: "" }) => {
    logger.debug(command);
    const res = await exec(`aws ssm send-command --document-name "AWS-RunShellScript" --comment "${opts.comment}" --instance-ids "${instanceid}" --parameters commands="${command}" --region us-east-1`);

    const cmdinfo = JSON.parse(res.stdout)
    const commandid = cmdinfo.Command.CommandId;

    await exec(`aws ssm wait command-executed  --command-id ${commandid} --instance-id ${instanceid} `);

}







module.exports = { logger, command, getStackStatus, commandSSM, waitForStatus, createStack, updateStack, wait }