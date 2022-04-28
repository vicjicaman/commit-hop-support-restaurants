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
//const ComposeAppStep = require("./steps/compose-app")
//const ComposeDataStep = require("./steps/compose-data")
//const ApplicationStep = require("./steps/application")

const SCOPE_NAME = process.env.SCOPE_NAME;
const SCOPE_VERSION = process.env.SCOPE_VERSION;
const BUILD_TARGET_PATH = process.env.BUILD_TARGET_PATH;

const rootPath = "../..";
const scope = SCOPE_NAME;
const version = SCOPE_VERSION;
const s3Target = `ua-wck-utils/${scope}/${version}`;
const outputPath = `${BUILD_TARGET_PATH}/${scope}/${version}`;
const artifactOutputPath = `${BUILD_TARGET_PATH}/artifact-output`;
 
(async () => {
    // Steps preparation for the Pipeline scripts

    const cxt = {
        outputPath,
        rootPath,
        scope,
        version,
        s3Target,
        artifactOutputPath
    };

    console.log("Publish helper");
    console.log(JSON.stringify(cxt, null, 2))

    // ENV
    await command(`mkdir -p ${artifactOutputPath}`);
    await command(`docker login`);

    await ComposeAppStep.step(cxt);
    await ComposeDataStep.step(cxt);
    await ProxyStep.step(cxt);
    await FormationStep.step(cxt);
    await FrontendStep.step(cxt);
    await BackendStep.step(cxt);
    await BackendStaticStep.step(cxt);
    await OriginRequestStep.step(cxt);
    await ApplicationStep.step(cxt);
    
})()