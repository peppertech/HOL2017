# Oracle JET Hands-On-Lab 2017

This project is a collection of smaller Hands-On-Lab sessions presented at the 2017 Oracle OpenWorld/JavaOne Conference.


These sessions will allow someone who is brand new to Oracle JET, to get a good understanding of the basic concepts of working with JET while creating, editing, and publishing a very simple application, or if you are already familiar with JET, the advanced session will provide you an existing Dashboard application and walk your through extending it to connect to a REST service to enable CRUD operations on a table, as well as connecting to a WebSocket service for random updates to your data.


### Prerequisites
* Node 4+ (preferably the LTS release)
* If running on a Mac, you will need to include "sudo" in front of all global npm commands shown in the lab


>**NOTE**  
NPM v5 has known bugs that will cause the JET CLI tool to fail on installation. Make sure you are on an earlier version of NPM than 5.x
To check your NPM version, type: `npm --version`  


### Installation
Clone the project and run the following command from the root of the project folder:

```
npm install -g @oracle/ojet-cli
```

>If you are using a proxy server, you will need to make sure that npm's proxy settings are configured properly before the above command will succeed.

### Where to start
If you are new to Oracle JET, we recommend you start with the [**Beginners Start**](./beginners-start) project. 
Change to the beginners-start directory and follow the steps outlined in the README.

If you have been working with JET for sometime, and would like to take an existing project to another level. 
The [**Advanced Start**](./adv-start) project is the place for you. Change to adv-start directory and follow the steps outline in the README. 
