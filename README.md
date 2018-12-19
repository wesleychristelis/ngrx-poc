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

**@actions**: 

Components __report__ and __event__ back to the store and this is known as an __action__. Once the store handles tha action it will modify the state it contains. The store will then broadcast the new version of the data to any intersted components that are subscribed and refflect the data accordingly.
  * Good example of an event __"CourseChangedAction"__ . Something has happened.
  * Bad example is __"IncrementCounterAction"__ this is more a COMMAND. This is telling something how to modify its data.
  
**@reducers**

Why is it called a reducer ? 

Because its signature is the same as the "reduce" functional programming operation.

* Reducers are used by the store handle an ACTION that was dispatched. Inherently when a store recieves a dispatched ACTION. The Store will do nothing until the __reducer__ is defined.

* A reducers is a function that take the Current State of the store as a parameter, and the Action as a second parameter. It will then output a new Application State. Always create a new object and not mutate an existing object.

* Reducers get called after dispatching an action, the "reducer function" is used to calculate the new store state in response to its corresponding action.

* All reducers are called at application statrtup

**@selectors**: 

Used to consume data from the store. A selector is basically a function that takes input from the store and generates as output a __"slice"__ or __*subset*__ of that state. Similar to the mapping function in RxJs but it solves an important problem. You do the calculation of derived state in an optimised way. 

__EXAMPLE:__ if we are getting back from a store the same state i.e. it has not changed. Then we are always computing the exact same result. If the function of calculation is large , this can cause a performance overhead. As new version of the state are emitted all the time. We want the result to be calculated only if there is something to calculate. Selector can memeorise the last few calculations. In functional prpgramming this is called memorisation.

The store is an observable of application state. Therefore if you subscribe to the store, you will recieve instances of applciation state any time it changes.
 
**@effects**: 

Allows us to handle store side effects. Side effects are things we want to happen when certain action / event occurs. We act in response to something.

__EXAMPLE:__ When a user logs in , we want to store in the state or the information in local storage or in a cookie. We use the store, so that if a user accidently refreshed the page, we want the state to be injected back into the store. Bearing in mind the store is purely memory. We can also use it to synchronise the state of the app with a DB

There are 2 types of effects:

1. Where effects produce other actions
2. Where the effect does not produce other actions. If this is the case NgRx needs to be informed of this using "dispatch: false" in the @effect decorator


NgRx Entity

NgRx Schematics



## When / Why to use a central store

##### Existing Issues / What problems NgRx Solve:
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

* NgRX Store Freeze (Ensure we right our reducers correctly) (https://github.com/brandonroberts/ngrx-store-freeze)
  * npm i --save-dev ngrx-store-freeze
  * Helps make sure we don't mutate the store data at the level of our components, so we indeed follow the principles of the store             architecture.
  * It ensures this by making your store state immutable in dev mode.
  
  
* Router Store integration module (https://github.com/ngrx/router-store)
  * Allows for time travel of the store
  * 
