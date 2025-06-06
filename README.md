# Fitgym

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.
Fitgym is a demo gym management application built with Angular. It includes simple member management, class scheduling and football court reservations. A small REST API is provided via [json-server](https://github.com/typicode/json-server) using `db.json`.

## Development server
## Prerequisites

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
- Node.js and npm installed

## Code scaffolding
## Installation

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
```bash
npm install
```

## Build
## Launching the application

1. **Start the API**

   ```bash
   npm run json-server
   ```
   The server runs on `http://localhost:3000` and serves data from `db.json`.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
2. **Start the Angular app** (in another terminal)

## Running unit tests
   ```bash
   npm start
   ```
   Visit `http://localhost:4200` in your browser.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
## Functionality

## Running end-to-end tests
- **Members** – add, edit, delete and view gym members.
- **Coaches** – manage coaches and book sessions.
- **Classes** – create classes and assign coaches.
- **Subscriptions** – track member subscriptions with a pie chart summary.
- **Football courts** – reserve courts and manage reservations.
- **Authentication** – login and registration pages using Firebase.

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
## Running tests

```bash
npm test
```

## Build

## Further help
```bash
npm run build
```

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
For additional Angular CLI commands see `package.json` or run `ng help`.
