require("dotenv").config();
const util = require("util");
const exec = util.promisify(require("child_process").exec);
import { wait } from "common/utils/wait";
import { exit } from "process";

const { Pool: DataClient } = require("pg");
const { Client: OpenSearchClient } = require("@opensearch-project/opensearch");
 

const restart = async () => {
    await wait(1000);
    console.log("restarting...")
    exit(0);
} 


export default async (cxt: any) => {
    const logger = cxt.container.cradle.logger;

    logger.info("data connection: " + process.env["DATA_URL"]);
    const data = new DataClient({
        connectionString: process.env["DATA_URL"],
    });

    {
        const res = await data.query(" SELECT 1 FROM pg_database WHERE datname='data'");
        if (res.rowCount === 0) {
            await data.query("create database data;");
            await restart();
        }
        logger.info("database ready");
    }

    logger.info("client connection: " + process.env["DATABASE_URL"]);
    const client = new DataClient({
        connectionString: process.env["DATABASE_URL"],
    });

    {
        const res = await client.query(`select * from pg_extension where extname = 'postgis'`);
        if (res.rowCount === 0) {
            await client.query("CREATE EXTENSION postgis;");
            await restart();
        }
        logger.info("postgis ready");
    }

    {
        const { stdout, stderr } = await exec(`yarn migrate up`);
        const str = stdout.toString();
        logger.info(str);
        if (str.indexOf("No migrations to run") === -1) {
            await restart();
        }
        logger.info("database ready");
    }

    logger.info("opensearch connection: " + process.env["SEARCH_URL"]);
    const searchClient = new OpenSearchClient({
        node: process.env["SEARCH_URL"],
    });

    try {
        await searchClient.indices.get({
            index: "restaurants"
        });
    } catch (e) {
        await searchClient.indices.create({
            index: "restaurants"
        });
        await restart();
    }

    {
        const res = await client.query(`select * from users where name = 'admin'`);
        if (res.rowCount === 0) {
            await client.query(`INSERT INTO users (id, name) VALUES ($1, $2)`, [1, "admin"]);
        }
        logger.info("admin ready");
    }

}