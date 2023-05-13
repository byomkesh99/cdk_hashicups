import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import { HashicupsProvider } from "./.gen/providers/hashicups/provider";
import { Order } from "./.gen/providers/hashicups/order";


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new HashicupsProvider(this, "hashicups", {
      username: "education",
      password: "test123"});

      new TerraformOutput(this, "order_id", {
        value: this.hashicups_order.id,
      });
  }
  
  hashicups_order = new Order(this, "item", {
    lastUpdated: Date.now.toString(),
    items: [
      {
        quantity: 3,
        coffee:
          {
          id: 1
        },
      },
      {
        quantity: 4,
        coffee:
          {
          id: 3
        },
      },
    ],
  });

}

const app = new App();
new MyStack(app, "iac");
app.synth();