# Automated testing example projet
This is an example project demonstrating automated testing. App is a simple currency converter app using publicly available API for getting currency exchange rates. It contains unit tests for backend. Mocking, stubbing and spying are demonstated. There are also API tests and E2E test for the frontend.



## Setting up

Project contains .env files, since there are no sensitive data. If Node or React needs to reconfigured, edit .env files. There are two, one for the front end on root folder and a second one under the server folder. By default, backend is running on http://localhost:3000 and frontend on http://localhost/5173. 

Install node modules for both backend and frontend. Run `npm i` under server and root for that.
You may also need to run `npm i express cors dotenv`

## Running app

Run backend by navigating to server folder and running `npm run dev` or `npm run start`. 
Run frontend by navigation to root folder and running `npm run dev`.

## Reset version control

Code is attached to a repository in Github already. To reset/replace that, delete .git folder on root and run npm init again. After that you are able to start version control from scratch again.

## Testing app with REST Client

Run backend by navigating to server folder and running `npm run dev` or `npm run start`. 
Open test.rest file under server/tests folder and press Send Request visible above test script.

## Running backend tests with Vitest

Navigate to server folder and run `npm run test`.

## Running frontend tests with Playwright

Navigate to root folder and run `npx playwright test`. Make sure, that backend is running. Playwright configuration will start frontend, if not running, but not the backend.






