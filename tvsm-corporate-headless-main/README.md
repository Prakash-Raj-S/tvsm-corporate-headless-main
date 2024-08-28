# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact


### local setup steps ###

1) Download the latest repository from : https://bitbucket.org/tvs-motor/tvsm-corporate-headless/

2) Double Confirm that the master and web database should not point to TVS Uat data bases. It Should point not to web and db databases

3) Install Jss package : 21.08.

4) Create an apiKey and try if the the JSS setup is working fine.

5) Change the deploy URL, layoutServiceHost and instance path in scjssconfig.json

6) Setup Sitecore Serialisation (min dot net core 3.1) --

    a) Install Sitecore Management Service (https://dev.sitecore.net/Downloads/Sitecore_CLI/5x/Sitecore_CLI_52113.aspx)

    b) Run : dotnet new tool-manifest in the terminal
    c) Run : dotnet tool install Sitecore.CLI --add-source https://sitecore.myget.org/F/sc-packages/api/v3/ index.json
    d) After successful installation, you can verify it using "dotnet sitecore"
    e) Run : dotnet sitecore init in the terminal
    f) Run : dotnet sitecore login --auth https://sc10identityserver.dev.local --cm https://sc10sc.dev.local --allow-write true" (Please update the cm and identity url for your instance)
    g) Run : dotnet sitecore ser pull -- To fetch items from sitecore instance to source control
    h) Run : dotnet sitecore ser push -- To push items from source control to sitecore
7) Verify if all the items have been pushed to sitecore (tvs-website-app)
8) All items in src folder, included in *.module.json will be serialised
9) Publish the tvs-website-app in the content node with related items. Also, publish the api key
10) Run : npm install
11) Run : jss start : connected to view the web page.
12) Run : Jss Deploy config
13) Run : jss deploy files
14) visit : local.tvsm.sc/tvs-website-app to browser the local sitecore url

Error : 

1) In case during CLI authentication fails --Update identityserver url in "\App_Config\Sitecore\Owin.Authentication.IdentityServer"

2) Update site node in case you want to access end site url : 

<site patch:before="site[@name='TVS']"
            inherits="website"
            name="tvs-website-app"
            hostName=""
            targetHostName="$(rootHostName)"
            virtualFolder="/tvs-website-app"
            rootPath="/sitecore/content/tvs-website-app"
            startItem="/home"
            database="web" />
</sites>