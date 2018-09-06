# OpamAngular

# Prereqs
- [Nodejs](https://nodejs.org/en/)

# Cloning this repo
`git clone https://github.com/JessePeplinski/oneprojectamonth-web-app.git`

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
1. Run `firebase deploy`
1. Done!

## Running Cloud Functions Locally
Run `firebase serve` from the root folder `/` to start cloud functions locally.

## First Time Deployment Config 
- https://alligator.io/angular/deploying-angular-app-to-firebase/

1. `firebase init`
1. Choose __Firestore__, __Functions__, __Hosting__, and __Storage__.
1. Choose project.
1. Firestore rules.
1. Firestore indexes
1. cloud functions - ts
1. TS for cloud functions
1. TSLint for bugs and style

### Issues Solved
## Build Folder
Set the build folder to be `dist/opam-angular` in the angular path. We could also set this in firebase rules.

## $RESOURCE_DIR issue
- https://stackoverflow.com/questions/48345315/error-deploying-with-firebase-on-npm-prefix-resource-dir-run-lint


Error messages appear on Windows:
"npm --prefix \"$RESOURCE_DIR\" run lint",
"npm --prefix \"$RESOURCE_DIR\" run build"

Changed to

{
  "functions": {
    "predeploy": [
      "npm --prefix ./functions/ run lint",
      "npm --prefix ./functions/ run build"
    ]
  }
}