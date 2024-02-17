import dotenv from "dotenv";

async function globalSetup(): Promise<void> {
    if (process.env.test_env) {
        dotenv.config({
            path: `.env.${process.env.test_env}`,
            override: true
        });
    }
}

export default globalSetup;
