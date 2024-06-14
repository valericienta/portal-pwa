export const environment = {
  production: true,
  hostAPI: 'https://apimobile.skualo.io/',
  dev: false,
  gps: true,
  onesignal: {
    appId: "97b4210b-5ec6-45fc-87a8-5155265bc24b",
    restApiKey:"ZTdkNThkYTMtNjRjNi00YzliLTgzMGMtOGY0NWNjNWQxY2Vh"
  },
  google: {
    clientId: '968316479331-ngfvq9o0sj36hh5bg2ujtlndhuq26eds.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  },
  msal: {
    appId: '8e8a4e37-f111-4220-85df-725ebb9ba678',
    redirectUri: 'https://localhost',
    authority: 'https://login.microsoftonline.com/consumers',
    scope: 'https://graph.microsoft.com/User.Read',
    authorizationBaseUrl: `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize`,
    accessTokenEndpoint: 'https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
  }
  }

