const { logger, command, copyWithActiveSegment } = require("../../utils")
const fs = require('fs').promises;
const path = require("path");

const enabled = true;

const step = async ({ outputPath, rootPath, commonPath, componentsPath, libsPath }) => {

    if (!enabled) {
        return
    }

    logger.info("Backend static step")
    const backendStaticPath = path.join(rootPath, "backend-static")
    const backendStaticCommonPath = path.join(backendStaticPath, "common");
    const backendStaticOutputPath = path.join(outputPath, "backend-static");

    const backendStaticProxyOutputPath = path.join(outputPath, "backend-static-proxy", "output");
    const backendProxyStandaloneOutput = `${path.join(backendStaticProxyOutputPath, "standalone")}`;
    const backendProxyStandaloneStaticOutput = `${path.join(backendProxyStandaloneOutput, ".next", "static")}`;
    const backendProxyStandaloneNextOutput = `${path.join(backendProxyStandaloneOutput, ".next")}`;
    const backendProxyStandalonePublicOutput = `${path.join(backendProxyStandaloneOutput, "public")}`;



    await command(`rm -rf ${backendStaticOutputPath}`);
    await command(`mkdir -p ${backendStaticOutputPath}`);
    await command(`mkdir -p ${backendStaticOutputPath}/.next`);

    await command(`mkdir -p ${backendProxyStandaloneOutput}`);
    await command(`mkdir -p ${backendProxyStandaloneStaticOutput}`);
    await command(`mkdir -p ${backendProxyStandalonePublicOutput}`);

    await command(`mkdir -p ${backendStaticCommonPath}`);
    await command(`cp -a ${componentsPath}/. ${backendStaticCommonPath}`);

    /*
    SERVER_GRAPHQL=https://www-api.ua-wck.com/backend/graphql
    NEXT_PUBLIC_SCOPE=www
    */
    await fs.writeFile(path.join(backendStaticPath, ".env.local"), `SERVER_GRAPHQL=https://www-api.ua-wck.com/backend/graphql
    NEXT_PUBLIC_SCOPE=www`, 'utf8');

    await command(`yarn install`, { cwd: backendStaticPath });
    await command(`yarn build`, { cwd: backendStaticPath });
    //await command(`cp -r ${path.join(backendStaticPath, ".next")} ${path.join(backendStaticOutputPath)}`);
    //await command(`cp -r ${path.join(backendStaticPath, "public")} ${path.join(backendStaticOutputPath)}`);
    //await command(`cp ${path.join(backendStaticPath, "package.json")} ${path.join(backendStaticOutputPath, "package.json")} `);
    //await command(`cp ${path.join(backendStaticPath, "yarn.lock")} ${path.join(backendStaticOutputPath, "yarn.lock")} `);
    //await command(`cp ${path.join(backendStaticPath, "next.config.js")} ${path.join(backendStaticOutputPath, "next.config.js")} `);
    //await command(`yarn install --production`, { cwd: backendStaticOutputPath });
    //await copyWithActiveSegment(`${path.join(backendStaticPath, "Dockerfile")}`, `${path.join(backendStaticOutputPath, "Dockerfile")}`, "prod");
    //await command(`docker build --no-cache -t ua-wck-backend-static .`, { cwd: backendStaticOutputPath });

    //backendStaticProxyOutputPath
    await command(`cp ${path.join(backendStaticPath, "next.config.js")} ${backendProxyStandaloneOutput}`);
    await command(`cp -r ${path.join(backendStaticPath, ".next", "standalone", ".")} ${backendStaticProxyOutputPath}`);
    await command(`cp -r ${path.join(backendStaticPath, ".next", "static", ".")} ${backendProxyStandaloneNextOutput}`);
    await command(`cp -r ${path.join(backendStaticPath, "public", ".")} ${backendProxyStandaloneOutput}`);



}

module.exports = { step }