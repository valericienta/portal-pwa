// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hostAPI: 'https://api.portaltrabajadores.cl/',
  dev: true,
  gps: true,
  google: {
   clientId: '968316479331-ngfvq9o0sj36hh5bg2ujtlndhuq26eds.apps.googleusercontent.com',
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
  }
};
