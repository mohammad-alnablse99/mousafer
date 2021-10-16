# mousafer

## Project Setup

You can find project setup instructions [here](./config/README.md)

## Editor Setup

You can find editor setup instructions [here](./_setup/README.md)

## Run

To run project:

```bash
$ npm run dev
```

To seed database

```bash
$ npm run seed
```

## Instructions

-   Branches named after task id
-   All files should be formatted with same rules

    we suggest using prettier extension for formatting

    > you can find project rules defind in `.prettierrc` file

-   We will use `async` , `await` style for async calling
-   We will use this file structure
    we have 5 main files for every module in `src/app`:
    -   `router.js` define module routes
    -   `service.js` contain module business logic
    -   `handler.js` destruct data from request and send the response
    -   `model.js` define database model
    -   `validator.js` validate input request data
-   We have `router.js` main router required authentication token and `publicRouter.js` without authentication token
-   All utils defied in `utils` and no one **allowed** to modify them with out **permission**
-   We will use custom error codes for business errors
-   We will use postman to document api calls and add examples
-   Ask before install any new library

## Restrictions

-   Any unformatted code we be **rejected**
-   Any code not belong to our coding style will be **rejected**
-   Any untested code will be **rejected**

## Note

You can find code style example called template in `src/app/_template` [link](./src/app/_template)

## Enjoy

> If you have any suggestions inform the project manager.
