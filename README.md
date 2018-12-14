# NgRx-poc (Centralised store pattern)

## Description
POC for ng-rx using action, reducers, selectors and effects

## Why we want to use a central store

Fundamental Parts of the centralised store solution is : 

@effects: Fundamental part of central store solution.

@selectors: 

NgRx Entity

NgRx Schematics

## When to use a central store

##### ExisTing Issues / What problems NgRx Solve:
* Constantly Fetching the same data (large amount of users would cause performance problem)
* Imporove user experince - we want to minimise the amount of "loading screens" we show the user
* ##### Important Reasons
  * Instand updates to UI components (Sync up the UI automatically with contacting the Backend).
  * Implicitly cover cases where datat has been changed and the UI state must update.

## Environment Setup

IMPORTANT: Use NPM 5 and above to make sure the package-json-lock is used

#### Prerequisites
 * git (https://git-scm.com/downloads)
 * node js (https://nodejs.org/en/)
 * IDE : Visual Code / Web Storm
 
#### Installing Angular/Cli

    npm install -g @angular/cli 
#### To Run the Development Backend Server

We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

#### To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)


## NgRx Dev Tools: (Setup include integration and router: Allows for full time travel debugging)

* NgRX Store Freeze (Ensure we right our reducers correctly)
  * Helps make sure we dont mutate the store data at the level of our components ,so we indeed follow the principles of the store             architecture.
* Router Store integration module
  




