import { Construct } from "constructs";
import { App, TerraformStack} from "cdktf";
import { HashicupsProvider } from "./.gen/providers/hashicups/provider/index.js";
import { Order } from "./.gen/providers/hashicups/order/index.js";
import * as fs from 'fs';
import * as path from 'path';
// logic starts from here
interface MyStackConfig {
  resourcePath: string;
}

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string, config: MyStackConfig) {
    super(scope, id);

    new HashicupsProvider(this, "hashicups", {
      username: "education",
      password: "test123"});

      new Order(this, "item", {
        lastUpdated: Date.now.toString(),
        items: loadItemList('./resources/'+config.resourcePath),
      });   
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
new MyStack(app, "order1", { resourcePath: "order1" });
new MyStack(app, "order2", { resourcePath: "order2" });
app.synth();
