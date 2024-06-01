# How to build a simple Angular frontend consuming a rest api

## Preruiqisites

- Node
- Npm
- Nvm (optionally)
- Angular CLI

**Preferred way**

Install NVM by visiting 'https://github.com/nvm-sh/nvm' and look for the latest version and install by 
running `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`. This will install Node Version Manager
which does what its name implies. Super handy when you need to switch between versions and want to download new versions. 

After installation do not forget to restart your terminal or use `source ~/.bashrc` or similar to make `nvm` active. Test by typing `nvm`.
run `nvm install node` to install the latest version. `node -v` to check your version.

Install NPM if you do not have it already (check by `npm -v`) by running ``. Installation is best done with your package manager e.g. for ubuntu
`sudo pacman -Syu`(upgrade package manager) & `sudo pacman -S npm`(install npm). Upgrading can be done with `npm install -g npm@latest`.

To creat Angular project quickly Angular CLI is great. Installation can be done by running `npm install -g @angular/cli` which installs latest version.
Check version after installation by `ng --version`

## Local

1. Create a new project by running `ng new <project-name>` in the directory where your projects are (it creates its own project directory).
You get a few options and I prefer all de default choices except CSS where I choose SCSS
2. Open the project in your IDE and create folder structure you want in src/app/ like core/features/shared but for now only create features/services/ ([inspiration](https://medium.com/@shijin_nath/angular-right-file-structure-and-best-practices-that-help-to-scale-2020-52ce8d967df5))
3. Start the project with `npm start` and you will see a nice starterpage by angular. 
We do not need it so go to the `app.component.html` and clear its content to start fresh.
4. In the services run `ng g s <servicename>` to create a service
5. We now have everything set up to put in the following code to make it work

**Service code**
```typescript
    constructor(private httpClient: HttpClient) { }

    getHeloWorld(): Observable<string> {
        return this.httpClient.get(`http://localhost:8080/rest/v1/`, {responseType: "text"})
    }
```

**Use the service in the ts file of the page**
```typescript
    message: string = ""

    constructor(private helloWorldService: HelloWorldService) {
    helloWorldService.getHeloWorld()
        .subscribe(response => this.message = response )
    }
```

**Show in html**
```html
    <div>
        {{message}}
    </div>
```
