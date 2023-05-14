# Utilizing Hashicups as Provider to play with fun APIs and ordering coffees.

To setup the environment, I have used CentOS Linux OS 7.9 as OS, with installing packages like Python, NodeJS, PNPM package manager, Docker, Git, Typescript (TS), Terraform, CDKTF (Cloud Development Kit for Terraform). 

Prerequisite:
We should have installed the following packages with version in the system:

* Docker v(20.10.21), 
* [Docker Compose](https://gist.github.com/npearce/6f3c7826c7499587f00957fee62f8ee9)
* Python version should be >=3.6.0 (Python 3.7.3) - Try [PYENV](https://realpython.com/intro-to-pyenv/)
* Terraform v1.4.6
* Git
* PNPM - `curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=8.5.0  sh -) v8.5.0, and then source ~/.bashrc`
* Node - v16.14.0, [Easy to install via NVM](https://tecadmin.net/install-nvm-on-amazon-linux/) 
* CDKTF - v0.16.1 `npm install --global cdktf-cli@latest) v0.16.1 and then source ~/.bashrc`
* Typescript -Version 4.9.5 (pnpm install will take are of it)

 Once the above packages gets installed and the platform is ready, do the follwing steps to use application.

1) In one of your system terminal clone this git repo - [Hashicups with CDK](https://github.com/byomkesh99/cdk_hashicups.git)
2) Terraform registry for Hashicups provider already updated in file "../cdk_hashicups/packages/iac/cdktf.json" at line number 9. If you want to build it locally then use this [link](https://developer.hashicorp.com/terraform/tutorials/providers/provider-use#install-hashicups-provider). Remember to update the line number 9 as `"source": "hashicorp.com/edu/hashicups"`
3) Now run the following command to pull all dependencies.

       cd cdk_hashicups && pnpm install
4) Open one more terminal to run the Terraform Core. 

       cd cdk_hashicups/packages/iac/hashicups-provider && docker compose up
            
5) You will see the output in terminal like below

       [+] Running 2/0
       ⠿ Container docker_compose-db-1   Created                                                                       0.0s
       ⠿ Container docker_compose-api-1  Created                                                                       0.0s
       Attaching to docker_compose-api-1, docker_compose-db-1
       docker_compose-db-1   
       docker_compose-db-1   | 2023-05-13 16:28:10.037 UTC [1] LOG:  database system is ready to accept connections
       docker_compose-api-1  | 2023-05-13T16:28:10.351Z [INFO]  Starting service: bind=0.0.0.0:9090 metrics=localhost:9102

           
6) Now create new [Hashicups user](https://developer.hashicorp.com/terraform/tutorials/providers/provider-use#create-new-hashicups-user) which going to authenticate against protected endpoints.
7) The requirement is to:
       * Each order should be definable as a folder, and the name of the folder going to be used as a resource id
       * Each file in the folder going to represent a single item of the order in the file contents; we are going to have the quantity for the item.
       * Make this process of deplying resources(orders) to be as automated as possible for the developers/engineers.
8) This has been implemented by creating:
       * order specific folder under `~/cdk_hashicups/packages/iac/resources/` and 
       * items for each order(s) as JSON file under order specific folder(s). 
9) Adding a new resource: Any developer needing to add a new order(resource) needs to create a folder named as order<x> with files(as items). To accomodate this, in the main.ts file, replace this
    
       new MyStack(app, "stack", { resourcePath: ["order1","order2"]}); 
with this 
       new MyStack(app, "stack", { resourcePath: ["order1","order2", "order<x>"]});
    
10) Updating an existing resource: Any developer needing to add a new item needs to create a file named item<x> the existing order<x> folder. 
11) To see the changes & deploy them, now go to the path and run CRUD operation.

       cd cdk_hashicups/packages/iac
       cdktf get              ## This will initialize the project with required module
       cdktf plan             ## It will display all the orders and how many resources going to add/update/remove
       cdktf deploy           ## deploy the resources. You play with CRUD operation now
       cdktf destroy          ## to destroy the resources. 
             
12) Once you run the above mentioned commands, you can see the orders (order1 and order2 etc.) and the items inside the order in Terminal. To view/get the order id, check this file `~/cdk_hashicups/packages/iac/cdktf.out/stacks/stack/cdk.tf.json`.
13) Use the API command (mentioned in steps number 16) to view all orders, delete orders etc.
14) Now if you wanted to add new items (as order), create file `cdk_hashicups/packages/iac/resources/order[1 or 2]/item[0-100]`. and copy the file content from any exiting items and then change the quantity number and id. And then run `cdktf plan/deploy` for adding items.
15) If you wanted to create new resource then create new folder `cdk_hashicups/packages/iac/resources/order[0-100]` and then add the new items as file and their content. Here you need to edit one line in program file `~/cdk_hashicups/packages/iac/main.ts` line number 56 i.e.  `new MyStack(app, "stack", { resourcePath: ["order1","order2", "order[0-100]"]});`. Meaning, exact new folder name created in `cdk_hashicups/packages/iac/resources/`. Now you have to again perform `cdktf plan/deploy` for adding resources. To remind here again, we are using directory name as resource id and file contents inside the file as order of items. At this point, App is complete ready to play with it.
16) Handy API call commands to play with CRUD operation
        
        Get order details by id:
        curl -X GET  -H "Authorization: <generated JWT token value>" localhost:19090/orders/1

        Get order details for all order:
        curl -X GET  -H "Authorization: <generated JWT token value>" localhost:19090/orders

        Delete order by id:
        curl -X DELETE  -H "Authorization: <generated JWT token value>" localhost:19090/orders/1

## Important Note:
 - If your CDKTF version is different than what I mentioned here then please update it on file `cdk_hashicups/packages/iac/package.json` and then run `pnpm install` to load the dependencies.
 - CDKTF mismatched versions going to show like below
     
       cdktf get
       [2023-05-13T19:19:09.547] [ERROR] default - npm
       npm[2023-05-13T19:19:09.787] [ERROR] default -  ERR! code ELSPROBLEMS
       npm ERR! invalid: cdktf@0.15.5 /home/ec2-user/cdk_hashicups/packages/iac/node_modules/cdktf
       {
       "error": {
       "code": "ELSPROBLEMS",
        "summary": "invalid: cdktf@0.15.5 /home/ec2-user/cdk_hashicups/packages/iac/node_modules/cdktf",
       "detail": ""
       }
       }
 - If your Linux system (RHEL or CentOS) version is =< 7.9 then you might require Devtool set to be installed and load it bash profile `. /opt/rh/devtoolset-7/enable`
 - Try to follow the order of prerequisites installation as I have mentioned above. It worked for me well.
