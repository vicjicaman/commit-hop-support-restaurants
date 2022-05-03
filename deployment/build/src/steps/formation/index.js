const { logger, command, buildParamTemplate, overrideTemplate } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");
const md5 = require("md5");

const enabled = true;

const step = async ({ outputPath, rootPath, commonPath, componentsPath, libsPath, version, scope }) => {

    if (!enabled) {
        return;
    }

    logger.info("Formation step")
    const formationPath = path.join(rootPath, "formation")
    const formationOutputPath = path.join(outputPath, "formation");

    await command(`rm -rf ${formationOutputPath}`);
    await command(`mkdir -p ${formationOutputPath}`);

    const versionHash = md5(version);
    logger.info("Version hash " + versionHash);

    const params = { "SCOPExVERSIONxHASH": versionHash, "SCOPExVERSION": version };

    await buildParamTemplate(
        path.join(formationPath, "distribution-stack.json"),
        formationOutputPath,
        params
    )

    await buildParamTemplate(
        path.join(formationPath, "gateway-stack.json"),
        formationOutputPath,
        params
    );

    await overrideTemplate(
        path.join(formationOutputPath, "gateway-stack.json"),
        formationOutputPath,
        (json) => {
            return {
                ...json,
                Resources: {
                    ...json.Resources,
                    BackendFunction: {
                        ...json.Resources.BackendFunction,
                        Properties: {
                            ...json.Resources.BackendFunction.Properties,
                            CodeUri: {
                                Bucket: "ua-wck-utils",
                                Key: {
                                    "Fn::Sub": `${scope}/${version}/backend/payload.zip`
                                }
                            }
                        }
                    },
                    BackendStaticProxyFunction: {
                        ...json.Resources.BackendStaticProxyFunction,
                        Properties: {
                            ...json.Resources.BackendStaticProxyFunction.Properties,
                            CodeUri: {
                                Bucket: "ua-wck-utils",
                                Key: {
                                    "Fn::Sub": `${scope}/${version}/backend-static-proxy/payload.zip`
                                }
                            }
                        }
                    }
                }
            }
        }
    );

    //await buildParamTemplate(
    //    path.join(formationPath, "backend-stack.json"),
    //    formationOutputPath,
    //    params)

}

module.exports = { step }