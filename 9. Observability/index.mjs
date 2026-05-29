import { withDurableExecution } from '@aws/durable-execution-sdk-js';
import { Logger } from "@aws-lambda-powertools/logger";

const powertoolsLogger = new Logger({ serviceName: "my-service" });

export const handler = withDurableExecution(async (event, context) => {

    console.log("Using console logger");

    context.configureLogger({ customLogger: powertoolsLogger });
    context.logger.info("Log Using Powertools logger");

    context.logger.info("Info message");

    // context.logger.warn("Warning message")
    // context.logger.error("err message")
    // context.logger.debug("Debug message")

    const result = await context.step("process", async (stpCtx) => {
        // throw new Error("abc")
        stpCtx.logger.info("Step");
        return "done";
    });

});
