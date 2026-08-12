import { cp, mkdir, rm } from "node:fs/promises";

const client = new URL("../dist/client/", import.meta.url);
const server = new URL("../dist/server/", import.meta.url);

await rm(new URL("../dist/", import.meta.url), { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });

await Promise.all([
  cp(new URL("../index.html", import.meta.url), new URL("index.html", client)),
  cp(new URL("../styles.css", import.meta.url), new URL("styles.css", client)),
  cp(new URL("../script.js", import.meta.url), new URL("script.js", client)),
  cp(new URL("../assets/", import.meta.url), new URL("assets/", client), {
    recursive: true,
  }),
]);

await cp(
  new URL("worker.js", import.meta.url),
  new URL("index.js", server),
);
