# Running Hashicups as Provider to play with fun APIs and ordering coffees.

To setup the environment, I have used CentOS Linux OS 7.9 as OS, with installing packages, Python, NodeJS, PNPM package manager, Docker, Git, Typescript (TS), Terraform, CDKTF (Cloud Development Kit for Terraform). 

Prerequisite:
We should have installed the following packages with version in the system:

* Docker v(20.10.21), 
* [Docker Compose](https://gist.github.com/npearce/6f3c7826c7499587f00957fee62f8ee9)
* Python version should be >=3.6.0 (Python 3.7.3) - Try [PYENV](https://realpython.com/intro-to-pyenv/)
* Terraform v1.4.6
* Git
* PNPM - `curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=8.5.0  sh -) v8.5.0, and then source ~/.bashrc`
* Node v16.14.0, [Easy to install via NVM](https://tecadmin.net/install-nvm-on-amazon-linux/) 
* CDKTF `npm install --global cdktf-cli@latest) v0.16.1 and then source ~/.bashrc`
* Typescript -Version 4.9.5 (pnpm install will take are of it)

Once the above packages installed and the platform is ready, do the follwing steps to use application.

1) In your system terminal clone this git repo - [Hashicups with CDK](https://github.com/byomkesh99/cdk_hashicups.git)
2) Hashicups provider already updated on "../cdk_hashicups/packages/iac/cdktf.json" in line number 9. If you wanted install [Locally downloaded & build Hashicups Provider](https://developer.hashicorp.com/terraform/tutorials/providers/provider-use#install-hashicups-provider) then use it. And update line number 9 as `"source": "hashicorp.com/edu/hashicups"`
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

