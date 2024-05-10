export const environment = {
  production: true,
  hostAPI: 'https://api.portaltrabajadores.cl/',
  dev: false,
  gps: true,
  google: {
    clientId: '968316479331-ngfvq9o0sj36hh5bg2ujtlndhuq26eds.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  },
  msal: {
    appId: 'be0bf2cf-8f4b-46f7-939d-50e429564d64',
    authority: 'https://login.microsoftonline.com/consumers',
    redirectUri: 'https://localhost/login',
    scope: 'https://graph.microsoft.com/User.Read',
    authorizationBaseUrl: `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize`,
    accessTokenEndpoint: 'https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
  }
};
