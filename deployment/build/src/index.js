require("dotenv").config();
const { logger, command } = require("./utils")
const fs = require('fs').promises;
const path = require("path");

const FrontendStep = require("./steps/frontend")
const BackendStep = require("./steps/backend")
const BackendStaticStep = require("./steps/backend-static")

const outputPath = "/media/victor/helper/build";
const rootPath = "../..";
const commonPath = path.join(rootPath, "common")
const componentsPath = path.join(commonPath, "components")
const libsPath = path.join(rootPath, "libs");


(async () => {
    // Steps preparation for the Pipeline scripts
    console.log("Build helper");

    const cxt = {
        outputPath,
        rootPath,
        commonPath,
        componentsPath,
        libsPath
    }

    // ENV
    await command(`mkdir -p ${outputPath}`);

    await FrontendStep.step(cxt);
    await BackendStep.step(cxt);
    await BackendStaticStep.step(cxt);

})()