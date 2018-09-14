# OpamAngular

# Prereqs
- [Nodejs](https://nodejs.org/en/)

# Quick Start
1. Clone the repo from Github `git clone https://github.com/JessePeplinski/oneprojectamonth-web-app.git`
1. Change directories into the repo `cd oneprojectamonth-web-app`
1. Run `npm install -g @angular/cli`
1. Run `npm install -g firebase-tools`
1. Run `firebase login` and follow the directions
1. Run `npm install` on the root level of the directory `/`
1. Change diretories into the `functions` folder `cd functions` and run `npm install`
1. Change directories to the root level `cd ..`
1. Run `ng serve --open` to start the server on `localhost:4200`
1. Run `firebase deploy` to deploy code to firebase

# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Quick Start
### Prerequisites
1. Install the Angular Cli with `npm install -g @angular/cli` (you dont need to be on the root level of the project for this)
1. On the root level of this project folder, run `npm install`
1. Run `ng serve` to start the front-end on `http://localhost:4200/`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Firebase
## Deployment
1. Install the Firebase CLI with `npm install --global firebase-tools`
1. `cd` into the `functions/` folder and run `npm install` (yes, there are two package.jsons, one within `functions/` and on the root level `/`)
1. On the root level of the folder (`/`) build the project for production with `ng build --prod`. Source maps will be generated within the `dist/` folder
1. Run `firebase deploy -m "Here is a message for the deploy"`
1. Done!

## Running Cloud Functions Locally
Run `firebase serve` from the root folder `/` to start cloud functions locally.

# Documentation with Compodoc
We are using [Compodoc](https://compodoc.app/guides/getting-started.html) for documentation.

It's added a depdendency in package.json, or you can install compodoc globally with `npm install -g @compodoc/compodoc`

## Render Documentation
1. Run `npm run compodoc:gen`
1. Documentation will be created within `/documentation`

## Render Documentation, and serve it 
1. Run `npm run compodoc:serve`
1. Go to `localhost:8080`