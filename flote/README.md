## Starting the server
```
npm run dev
```
Open http://localhost:5173/.

## Project structure
```sh
src
|
+-- app               # application layer containing:
|   |
|   +-- pages         # application pages
|   +-- app.tsx       # main application component
|   +-- provider.tsx  # application provider that wraps the entire application with different global providers
|
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application, organized according to Atomic Design
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # global state stores
|
+-- test              # test utilities and mocks
|
+-- models            # shared types used across the application
|
+-- utils             # shared utility functions
```
[Source: Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)