// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hostAPI: 'https://api.portaltrabajadores.cl/',
  dev: true,
  gps: true,
  google: {
   clientId: '1005811561165-on19n463kt0jlbjkbbtr64o7po7r5rsb.apps.googleusercontent.com',
   scopes: ['profile', 'email']
  },
  msal: {
    // appId: '8e8a4e37-f111-4220-85df-725ebb9ba678',
    appId: 'be0bf2cf-8f4b-46f7-939d-50e429564d64',
    authority: 'https://login.microsoftonline.com/consumers',
    redirectUri: 'http://localhost:8100',
    scope: 'https://graph.microsoft.com/User.Read',
    authorizationBaseUrl: `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize`,
    accessTokenEndpoint: 'https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
  },
  firebase: {
    apiKey: "AIzaSyBXw19TsA7tEfmYGy1BQyI1iZehHw3TCTQ",
    authDomain: "portal-trabajadores-423220.firebaseapp.com",
    projectId: "portal-trabajadores-423220",
    storageBucket: "portal-trabajadores-423220.appspot.com",
    messagingSenderId: "1005811561165",
    appId: "1:1005811561165:web:c371cc53cfb329dc4d2f84",
    measurementId: "G-D1PRM6S2PX"
  }
};
