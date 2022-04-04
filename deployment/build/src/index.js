require("dotenv").config({ path: '../.env' });
const { logger, command } = require("./utils")
const fs = require('fs').promises;
const path = require("path");

const FormationStep = require("./steps/formation")
const FrontendStep = require("./steps/frontend")
const BackendStep = require("./steps/backend")
const BackendStaticStep = require("./steps/backend-static")
const OriginRequestStep = require("./steps/origin-request")

const SCOPE_NAME = process.env.SCOPE_NAME;
const SCOPE_VERSION = process.env.SCOPE_VERSION;


const rootPath = "../..";
const commonPath = path.join(rootPath, "common")
const componentsPath = path.join(commonPath, "components")
const libsPath = path.join(rootPath, "libs");
const scope = SCOPE_NAME;
const version = SCOPE_VERSION;
const outputPath = `/media/victor/helper/build/${scope}/${version}`;


(async () => {
    // Steps preparation for the Pipeline scripts
    
    const cxt = {
        outputPath,
        rootPath,
        commonPath,
        componentsPath,
        libsPath,
        scope,
        version
    };
    console.log("Build helper");
    console.log(JSON.stringify(cxt, null, 2))

    // ENV
    await command(`mkdir -p ${outputPath}`);

    await FormationStep.step(cxt);
    await FrontendStep.step(cxt);
    await BackendStep.step(cxt);
    await BackendStaticStep.step(cxt);
    await OriginRequestStep.step(cxt);

})()