import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'portaltrabajadores.skualo.cl',
  appName: 'Portal de Trabajadores',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '1091254295542-tdpaknchrp0pf0bpf7ssa37nvfdvhmr1.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    },
    SplashScreen: {
      launchShowDuration: 5000,
      androidSpinnerStyle: '',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
    }
  }
};

export default config;
