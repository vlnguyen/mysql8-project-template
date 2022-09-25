# React Client <!-- omit in toc -->

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It demonstrates simple fetching data from an API as well as using a global context for persisting a user session.

- [Running the Project](#running-the-project)
- [Implementation](#implementation)
  - [Proxying API Requests](#proxying-api-requests)
  - [User Sessions (AppContext)](#user-sessions-appcontext)
- [Notes](#notes)

## Running the Project

You can run the app in development mode with the following.

```
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

## Implementation

### Proxying API Requests
A proxy path is set in `package.json` to redirect requests to the API running locally.
```json
{
    "proxy": "http://localhost:8080"
}
```
This allows request URLs to be written without the hostname, e.g. `/api/session` rather than `http://localhost:8080/api/session` which would otherwise throw a CORS error.


### User Sessions (AppContext)

Although it's possible to store session data in cookies or `localStorage`, fetching session data with an API call is very cheap thanks to the data being persisted in a Redis cache.

When the homepage is first loaded an API call is made to `GET /api/session` and saved in `AppContext`. The main `<App/>` is wrapped in `<AppContext.Provider/>` to make those values accessible throughout the app.

The values can be accessed in other components with the `useContext` hook and passing in the `AppContext`.

```ts
const { session } = useContext(AppContext);
```

## Notes

This client demonstrates the bare minimum for  interacting with the API. There are many opportunities to create a better environment for developing the frontend, including but not limited to:
- writing a general API handler that can handle the consistent `IApiResponse<T>` type from the API
- writing API handlers with interfaces so that they can be mocked
- using a CSS preprocessor like Sass
- using `React.Context` to implement theme or language providers
- implementing styled components
- setting up Storybook for component documentation
- writing component tests
