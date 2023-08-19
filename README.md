# Result

A simple lib for wrapping lazy promise or task into result.

### Install

```sh
pnpm add @tqman/result
```

### Example

```ts
import { readFile } from "fs/promises";
import { computeResult } from "@tqman/result";

type Config = {
  PORT: number;
};

async function readConfigFile(): Promise<Config> {
  return readFile("./config.json", "utf-8").then((data) => JSON.parse(data));
}

const config = await computeResult(readConfigFile);

if (!config.ok) {
  console.error("Config file not found");
  process.exit(1);
}

console.log(`Listening on port ${config.value.PORT}`);
```
