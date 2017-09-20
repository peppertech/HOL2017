# Beginners Oracle JET HOL 2017

### Prerequisites
* node 4+ (preferably the LTS)
* follow the steps at the root of this project to install command line tools

>If you are running this HOL from behind a firewall, please make sure you have the npm proxy configurations setup properly before running any of the below steps

### Seeing the final project first
If you would like to see what your final project will look like when you are finished, you can follow these steps.  
From the root of the [**beginners-finished**](./beginners-finished) directory, run the following commands: 
```
npm install  
ojet serve
```
The project will install all of the required files and then build and serve the application in your default browser. You can use the code from this project to compare with your own code that you will be writing under the **/beginners-start** directory 

***
### Getting Started

To get the initial project setup for your Hands-On-Lab, run the following command from the command line at the root of the **/beginners-start** directory:  

```
ojet create myHOL2017 --template=navdrawer
```

Once the above command completes, you should have a directory structure that looks similar to Image 1 below.  

![default folder structure](./images/image-1.png "Default project file structure")  
**IMAGE 1**  

To build the default project, run:  
```
ojet build
```

>By default this will build a web application for you and add a /web folder to your project root.  This is what you will be working with >for this HOL, however, if you had Cordova and the appropriate SDK installed for Android, iOS, or Windows, you could build a JET hybrid >application by running the same command as above, with these additional options: 
> 
> `--hybrid --platform=android | ios | windows`  


![folder structure after build](./images/image-2.png "Project file structure after build")  
**IMAGE 2**  


***
### Editing the project
Make all code edits in the **/src folder**.  
If you make edits to any HTML, CSS, or JavaScript files while the `ojet serve` command is running, 
the changes will automatically be pushed to the /web folder and the browser will refresh.

Adding or removing libraries from the project will require a rebuild.

### Creating a Composite Component
In JET, there is a concept of a reusable component called a composite component. You will often see this referred to as a CCA component as well.  CCA stands for Composite Component Architecture.  These special kinds of components are built according to the HTML5 Web Component specification and can be re-used across multiple Oracle development frameworks and tools, such as the Visual Builder Cloud Service and Sites Cloud Service.

To create your new component run the following command from the root of the project that you just created.  
```
ojet create component my-chart
```

>The name of your component can be different, but it must be all lowercase and have at least one hyphen in the name.  This naming convention is part of the HTML5 web component specification.

Once you have created your component, you will see that it has been added to a directory called **jet-composites** using the name that you gave your component.  This new component directory contains the default template. The directory structure of your project should now look like image 3 below

![folder structure with composite component](./images/image-3.png "Project structure with composite component")  
**IMAGE 3**

***
### Using an editor or IDE of your choice
So far, you have used the command line for quickly setting up the structure of your application.  From this point on, you are going to be editing code, as well as copying and pasting code from the Oracle JET Cookbook website.  JET is written in regular JavaScript, HTML, and CSS.  Because of this, you can use just about any editor that provides support for these technologies.  

The screenshots showing code and application structure in this HOL, will be from NetBeans IDE.  NetBeans can open an existing JET application without any configuration or special setup.  Just choose "open project" from the NetBeans menu toolbar or menu and navigate to the root of your application.

### Adding the default component to your application page
Now that you have a new composite component, let's add it to the Dashboard page of your application.
JET starter templates use a feature of JET called ojModule.  This is the ability to define a view (HTML) and a viewModel(JS) and combine them to deliver a specific section of the page as a simple module.  These view and viewModel files are found in the /js directory under directories of the same name.

Open the dashboard.html file from the **/js/views** directory and add the following HTML code just under the `<H1>` element. 

```xml
<mychart id="chart1"></my-chart>
```

The resulting code will look like image 4 below.

![dashboard html with first component](./images/image-4.png "dashboard html with first component")  
**IMAGE 4**


Now open the dashboard.js file located in the **/js/viewModels** directory and add a reference to your new my-chart component in the **define** block at the top of the file.

The code you are going to add is a path to the **loader.js** file of your component.

`jet-composites/my-chart/loader`
 
 and the final code will look like image 5 below.
 
 ![dashboard javascript with loader reference](./images/image-5.png "dashboard javascript with loader reference")  
**IMAGE 5**
 
Save both files and run your application again by typing:

```
ojet serve
```

You should see the application loaded in your default browser, and the Dashboard page will look like image 6 below. Notice the **Hello from Example Component** message.

 ![running app with component message shown](./images/image-6.png "running app with component message shown")  
**IMAGE 6**

 
 ***
 
 ### Making things more interactive
 By default, your new component only displays new content into your page. However you can define HTML5 attributes for your component that will allow the developer to pass in values to your component at runtime.  Your component can then process those values and use  them to manipulate the content that you want to display.


####  Adding an attribute in HTML
To make things simple, let's let the developer pass in the message that we display when the component is rendered. Re-open the dashboard.html file and add an attribute to the `<my-chart>` component.  Name this attribute **my-message** and set the value to anything you like.

```xml
<my-chart id="chart1" my-message="My new message from runtime"></my-chart>
```

>Notice that the custom attribute starts with a prefix of **my-**. It's a good idea to add some kind of prefix to your attributes to help avoid the chance of naming an attribute after some existing attribute that you were not aware of.  Like a reserved word for the base HTML element that your composite component could be based on.

#### Defining the attribute in your component
You now have the HTML code ready to send a new message to your component. But you need to tell your component to look for that attribute first, and then decide what you are going to do with that information once you find it.

Go to the **/js/jet-composites/my-chart/** directory and open the **component.json** file. This is the main definition file for your components metadata.  You can set the _name_, _description_, _version_, and many other propertiess in this file. One important property  to set is the _jetVersion_ property. This tells a developer what version of JET your component is written (and hopefully tested) to work with.  Most of these properties will be used when you publish your component to a future component catalog.

For this Hands-on-Lab, you are going to add the definition of your attribute to the _properties_ object. You will provide the name, and the type of data that is going to be passed by the attribute. The code that you are going to add will be:

```javascript
  "properties": {
    "myMessage": {
      "type": "string"
    }
  },
```
There are a couple of key points to notice in the above code.  When you defined the attribute in your HTML code, you used a hyphen (-) to separate your prefix from your attribute name.  Notice in the JSON definition, you remove that hyphen and make the first letter that followed it, an upper case letter. The basic rule is that camel-case property names are converted into case-insensitive HTML element attributes with hyphens at the camel-case break point of the original name. So _myMessage_ has become _my-message_.

You have also defined the _type_ that this attribute will pass, to be a string. The final components.json file will look like image 7 below.

 ![contents of components.json file](./images/image-7.png "contents of components.json file")  
**IMAGE 7**


