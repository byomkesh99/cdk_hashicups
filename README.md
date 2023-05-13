# Running Hashicups as Provider to play with fun APIs and ordering coffees.

To setup the environment, I have used CentOS Linux OS 7.9 as OS, with installing packages, Python, NodeJS, PNPM package manager, Docker, Git, Typescript (TS), Terraform, CDKTF (Cloud Development Kit for Terraform). 

Prerequisite:
We should have installed the following packages with version in the system:

* Docker v(20.10.21), 
* PNPM v8.5.0, 
* Node v16.14.0, 
* Python version should be >=3.6.0 (Python 3.7.3)
* Typescript(Version 4.9.5)
* CDKTF v0.16.1
* Terraform v1.4.6
* Git

Once the above packages installed and the platform is ready, do the follwing steps to use application.

1) In your system terminal clone this git repo - [Hashicups with CDK](https://github.com/byomkesh99/cdk_hashicups.git)
2) Install [Hashicups Provider](https://developer.hashicorp.com/terraform/tutorials/providers/provider-use#install-hashicups-provider)
3) Open one more terminal to run the Terraform Core. 

            cd cdk_hashicups/packages/iac/hashicups-provider && docker compose up
            
4) You will see the output in the screen like below

       [+] Running 2/0
       ⠿ Container docker_compose-db-1   Created                                                                       0.0s
       ⠿ Container docker_compose-api-1  Created                                                                       0.0s
       Attaching to docker_compose-api-1, docker_compose-db-1
       docker_compose-db-1   
       docker_compose-db-1   | 2023-05-13 16:28:10.037 UTC [1] LOG:  database system is ready to accept connections
       docker_compose-api-1  | 2023-05-13T16:28:10.351Z [INFO]  Starting service: bind=0.0.0.0:9090 metrics=localhost:9102

           
5) Now create new [Hashicups user](https://developer.hashicorp.com/terraform/tutorials/providers/provider-use#create-new-hashicups-user) which going to authenticate against protected endpoints
6) Now go the path and run CRUD operation for ordering Coffee

       cd cdk_hashicups/packages/iac
       cdktf plan 
       cdktf deploy
       
7) Once you run the above mentioned command (mentioned in point step 6) you can see the orders (order1 and order2) and the items inside the order.
8) Now you can create another directory and files inside directory for ordering coffee. Here is the path "cdk_hashicups/platform-challenge/packages/iac/resources". Note, we are using using directory name as resource id and file contents inside the file as order of items.








# Yassir take-home platform engineering challenge

**Note**: Do not **fork** this repository. Just clone it locally. We do not accept pull requests.

This repository acts as a boilerplate to get you started tackling Yassir's platform engineering challenge.

The stack used here is close to what we use for Infrastructure As Code. Mainly:

- [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).
- [CDK for Terraform](https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-install).
- Typescript as the IaC language of choice.
- A [monorepo](https://monorepo.tools/) managed with [pnpm](https://pnpm.io/).

Once you have the above-mentioned tools installed you can run `pnpm install` to install the npm/Typescript dependencies.

## About the challenge
The challenge is about showcasing your ability to implement and manage infrastructure using code. You'll need to use Hashicups.

[Hashicups](https://registry.terraform.io/providers/hashicorp/hashicups/latest/docs) is a fictional Terraform provider. It does not provision real infrastructure (like AWS or GCP), but instead resources are represented as coffee
orders in a coffee-shop. The idea is to mimic cloud-providers with a simple, fun API, without having to deal with cloud providers registrations, accounts or billing for our candidates.

The gist of the work is mostly translating the [CRUD operations](https://developer.hashicorp.com/terraform/tutorials/providers/provider-use) from plain Terraform to CDKTF.


## The deliverable
The final output should be this repository updated with your code, configs and setup. We should be able to:
- Have your repository in a zip format.
- Able to run `pnpm install` for all required/new dependencies.
- A way or a command to run Hashicups APIs locally (feel free to bundle it in a docker compose file).
- README.md updated, or a `help` file included on how to provision the infrastructure using Hashicups.
- Be able to provision the CRUD operation for the coffee-shop. The Infrastructure as Code should go under `packages/iac`.
- A way to destroy/cleanup the infrastructure.
- All using cdktf, not plain terraform.
- Bonus points for using [Constructs](https://developer.hashicorp.com/terraform/cdktf/concepts/constructs) and [CDKTF best practices](https://developer.hashicorp.com/terraform/cdktf/create-and-deploy/best-practices).

### Having troubles?
If you're encountering any troubles, feel free to send an email to `platform@yassir.com`.
