import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import { homedir } from "os";

const tenHandsDir = path.join(homedir(), ".ten-hands");

const CONFIG_FILES = {
  configFile: path.join(tenHandsDir, "config.json")
};

mkdirp.sync(tenHandsDir);

const defaultConfig = {
  port: 1010
};

if (!fs.existsSync(CONFIG_FILES.configFile)) {
  fs.writeFileSync(CONFIG_FILES.configFile, "{}");
}

const conf = JSON.parse(fs.readFileSync(CONFIG_FILES.configFile, "utf8"));

export default {
  ...defaultConfig,
  ...conf
};
