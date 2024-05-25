export const environment = {
  production: true,
  hostAPI: 'https://api.portaltrabajadores.cl/',
  dev: false,
  gps: true,
  google: {
    clientId: '1005811561165-on19n463kt0jlbjkbbtr64o7po7r5rsb.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  },
  msal: {
    appId: '8e8a4e37-f111-4220-85df-725ebb9ba678',
    authority: 'https://login.microsoftonline.com/consumers',
    redirectUri: 'https://portal-148c8.web.app/',
    scope: 'https://graph.microsoft.com/User.Read',
    authorizationBaseUrl: `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize`,
    accessTokenEndpoint: 'https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
  }
  }

