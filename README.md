# NgRx-poc (Centralised store pattern)

## Description
POC for ng-rx using action, reducers, selectors and effects

## Fundamental Parts of the centralised store solution is :

#### Overview of Architecture
* Data is Immutable and belongs to the store.
* Components subscribe to the store service
* To modify Data components need to report and event in the for of an ACTION.
* The store will then act / handle on the event.
* Store will emit a new version of the data to any subscribed components.

**@actions**: Components __report__ and __event__ back to the store and this is known as an __action__. Once the store handles tha action it will modify the state it contains. The store will then broadcast the new version of the data to any intersted components that are subscribed and refflect the data accordingly.
  * Good example of an event __"CourseChangedAction"__ . Something has happened.
  * Bad example is __"IncrementCounterAction"__ this is more a COMMAND. This is telling something how to modify its data.
  
**@reducers**
Why is it called a reducer ? 
Because its signature is the same as the "reduce" functional programming operation.

Reducers are used by the store handle an ACTION that was dispatched. Inherently when a store recieves a dispatched ACTION. The Store will do nothing until the __reducer__ is defined.

A reducers is a function that take the Current State of the store as a parameter, and the Action as a second parameter. It will then output a new Application State. Always create a new object and not mutate an existing object.

Reducers get called after dispatching an action
  
**@effects**: Fundamental part of central store solution.

**@selectors**: 

NgRx Entity

NgRx Schematics


## When / Why to use a central store

##### ExisTing Issues / What problems NgRx Solve:
* Constantly Fetching the same data (large amount of users would cause performance problem)
* Imporove user experince - we want to minimise the amount of "loading screens" we show the user

##### Important Reasons
* Instand updates to UI components (Sync up the UI automatically with contacting the Backend).
* __Implicitly__ cover cases where datat has been changed and the UI state must update.
* __Decouple__ you data from your __components__, when the component gets destroyed, so does the data
* Components will be a pure representation of state. No longer responsible for fetching and storing the data.
* Data is protected and owned by the store.

## Environment Setup

**IMPORTANT**: Use NPM 5 and above to make sure the package-json-lock is used

#### Prerequisites
 * git (https://git-scm.com/downloads)
 * node js (https://nodejs.org/en/)
 * IDE : Visual Code / Web Storm
 
#### Installing Angular/Cli

    npm install -g @angular/cli 
    
#### Installing Store Libraries

     * NgRx Git (https://github.com/ngrx/platform) && (https://ngrx.io/)
    "@ngrx/effects" a lib for reflecting the state of the stor ein the outside world.
    "@ngrx/entity" loading entities in a sinplified way
    "@ngrx/router-store" give us integration between the store, dev tools and the router.
    "@ngrx/store"
    "@ngrx/store-devtools" browser pluign to inspect store
    "@ngrx/schematics" extension to the angualr cli , allows us to quickly scaffold code.      (https://github.com/ngrx/platform/tree/master/docs/schematics)
        
    
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
  




