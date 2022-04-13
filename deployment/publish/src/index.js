require("dotenv").config({ path: '../.env' });
const { logger, command } = require("./utils")
const fs = require('fs').promises;
const path = require("path");

const FormationStep = require("./steps/formation")
const FrontendStep = require("./steps/frontend")
const BackendStep = require("./steps/backend")
const BackendStaticStep = require("./steps/backend-static")
const OriginRequestStep = require("./steps/origin-request")
const ProxyStep = require("./steps/proxy")
const ComposeAppStep = require("./steps/compose-app")
const ComposeDataStep = require("./steps/compose-data")

const SCOPE_NAME = process.env.SCOPE_NAME;
const SCOPE_VERSION = process.env.SCOPE_VERSION;

const rootPath = "../..";
const scope = SCOPE_NAME;
const version = SCOPE_VERSION;
const s3Target = `ua-wck-utils/${scope}/${version}`;
const outputPath = `/media/victor/helper/build/${scope}/${version}`;

(async () => {
    // Steps preparation for the Pipeline scripts
    console.log(`Publish helper `);

    const cxt = {
        outputPath,
        rootPath,
        scope,
        version,
        s3Target
    };

    // ENV
    await command(`docker login`);

    await ComposeAppStep.step(cxt);
    await ComposeDataStep.step(cxt);
    await ProxyStep.step(cxt);
    await FormationStep.step(cxt);
    await FrontendStep.step(cxt);
    await BackendStep.step(cxt);
    await BackendStaticStep.step(cxt);
    await OriginRequestStep.step(cxt);
    

})()