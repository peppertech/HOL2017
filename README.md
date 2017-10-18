# Oracle JET Hands-On-Lab 2017

This project is a collection of smaller Hands-On-Lab sessions presented at the 2017 Oracle OpenWorld/JavaOne Conference.


These sessions will allow someone who is brand new to Oracle JET, to get a good understanding of the basic concepts of working with JET while creating, editing, and publishing a very simple application. If you are already familiar with JET, the advanced session will provide you an existing Dashboard application and give you options for extending it, such as connecting to a REST service to enable CRUD operations on a table, or connecting to a WebSocket service for random updates to your data.


### Prerequisites
* Node 4+ (preferably the [Node LTS release](https://nodejs.org) ) for use of npm as an installer
* If running on a Mac, you will need to include "sudo" in front of all global npm commands shown in the lab
* Git installed and configured properly (this is optional, read the installation step for details) https://git-scm.com/downloads
* If you have an existing version of the preview release of `ojet-cli` installed, please uninstall it before installing this official release.
```
npm un -g ojet-cli
npm un -g generator-oraclejet
```

>**NOTE**  
NPM v5 has known bugs that will cause the JET CLI tool to fail on installation. Make sure you are on an earlier version of NPM than 5.x
To check your NPM version, type: `npm --version`  


### Installation
From a command prompt, type the following command to install Oracle JET Command Line Interface(CLI). 

```
npm install -g @oracle/ojet-cli
```

***

>If you are using a proxy server, you will need to make sure that npm's proxy settings are configured properly before the above command will succeed.

### Where to start
If you are new to Oracle JET, we recommend you start with the [**Beginners Start**](./beginners-start) project. Follow the steps
described in the README file at the above link.

If you have been working with JET for sometime, and would like to take an existing project to another level. 
The [**Advanced Start**](./adv-start) project is the place for you. Clone the HOL Git repository and change to adv-start directory and follow the steps outline in the README. 
