require("dotenv").config({ path: '../.env' });
const { logger, command } = require("./utils")
const fs = require('fs').promises;
const path = require("path");

const FrontendStep = require("./steps/frontend")
const BackendStep = require("./steps/backend")

const SCOPE_NAME = process.env.SCOPE_NAME;
const SCOPE_VERSION = process.env.SCOPE_VERSION;
const CERTIFICATE_ARN = process.env.CERTIFICATE_ARN;
const HOSTEDZONE_ID = process.env.HOSTEDZONE_ID;

const rootPath = "../..";
const scope = SCOPE_NAME;
const version = SCOPE_VERSION;
const certificateARN = CERTIFICATE_ARN;
const hostedZoneId = HOSTEDZONE_ID;
const s3Target = `ua-wck-utils/${scope}/${version}`;

(async () => {
    // Steps preparation for the Pipeline scripts
    const cxt = {
        rootPath,
        scope,
        version,
        hostedZoneId,
        certificateARN,
        s3Target
    };

    console.log(`Deploy helper`);
    console.log(JSON.stringify(cxt, null, 2));
    await FrontendStep.step(cxt);
    await BackendStep.step(cxt);
})()