require("dotenv").config({ path: '../.env' });
const { logger, command } = require("./utils")
const fs = require('fs').promises;
const path = require("path");

const FormationStep = require("./steps/formation")
//const FrontendStep = require("./steps/frontend")
const BackendStep = require("./steps/backend")
const BackendStaticProxyStep = require("./steps/backend-static-proxy")
const BackendStaticStep = require("./steps/backend-static")
//const OriginRequestStep = require("./steps/origin-request")
//const ProxyStep = require("./steps/proxy")
//const ComposeAppStep = require("./steps/compose-app")
//const ComposeDataStep = require("./steps/compose-data")
//const ApplicationStep = require("./steps/application")

const SCOPE_NAME = process.env.SCOPE_NAME;
const SCOPE_VERSION = process.env.SCOPE_VERSION;
const BUILD_TARGET_PATH = process.env.BUILD_TARGET_PATH;

const rootPath = "../..";
const commonPath = path.join(rootPath, "common")
const componentsPath = path.join(commonPath, "components")
const libsPath = path.join(rootPath, "libs");
const scope = SCOPE_NAME;
const version = SCOPE_VERSION;
const outputPath = `${BUILD_TARGET_PATH}/${scope}/${version}`;

if(typeof String.prototype.replaceAll === "undefined") {
    String.prototype.replaceAll = function(match, replace) {
       return this.replace(new RegExp(match, 'g'), () => replace);
    }
}

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

    //await ProxyStep.step(cxt);
    await FormationStep.step(cxt);
    //await FrontendStep.step(cxt)
    await BackendStaticProxyStep.step(cxt);
    await BackendStep.step(cxt);
    await BackendStaticStep.step(cxt);
    //await OriginRequestStep.step(cxt);
    //await ComposeAppStep.step(cxt);
    //await ComposeDataStep.step(cxt);
    //await ApplicationStep.step(cxt);

})()