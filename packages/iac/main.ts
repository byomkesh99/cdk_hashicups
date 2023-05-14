import { App, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import * as fs from 'fs';
import * as path from 'path';
import { Order } from "./.gen/providers/hashicups/order/index.js";
import { HashicupsProvider } from "./.gen/providers/hashicups/provider/index.js";


interface MyStackConfig {
  resourcePath: string[];
}

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string, config: MyStackConfig) {
    super(scope, id);

    new HashicupsProvider(this, "hashicups", {
      username: "education",
      password: "test123"});

    const resourcePath = config.resourcePath;
    for (let index = 0; index < resourcePath.length; index++) {
      new Order(this, config.resourcePath[index], {
        items: loadItemList(`./resources/${resourcePath[index]}`),
      }); 
    }
  }
}

export function* readAllFiles(dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name));
    } else {
      if (!file.name.match('.DS_Store')) {
        yield path.join(dir, file.name);
      }
    }
  }
  return files;
}

function loadItemList(dir: string) {
  const itemsList = [];
  for (const filePath of readAllFiles(dir)) {
    const loadedItem = fs.readFileSync(filePath, 'utf-8');
    const item = JSON.parse(loadedItem);
    itemsList.push(item);
  }
  return itemsList;
}

const app = new App();
new MyStack(app, "stack", { resourcePath: ["order1","order2"]});
app.synth();