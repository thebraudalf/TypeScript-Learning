import { createServer } from "@inngest/agent-kit/server";
import { OnGivenLocation } from "./functions/on-given-location.js";
import { OnAskedAdvice } from "./functions/on-asked-advice.js";
import { OnAskedQuery } from "./functions/on-asked-query.js";

const server = createServer({
  functions: [OnGivenLocation, OnAskedAdvice, OnAskedQuery]
});

server.listen(3010, () => console.log("Agent kit running!"));
