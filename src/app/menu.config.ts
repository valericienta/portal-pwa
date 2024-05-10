import {
  IconProp,

} from '@fortawesome/fontawesome-svg-core';

export const menu: {
  index: number;
  title: string;
  url: string;
  iconfull: IconProp;
  clase: string;
}[] = [
    { index: 0, title: 'Inicio', url: '/home', iconfull: ['fad', 'house'], clase: 'mb-5' },
    { index: 1, title: 'Liquidaciones', url: '/liquidaciones', iconfull: ['fad', 'money-check-alt'], clase:  'text-primary' },
    { index: 2, title: 'Vacaciones', url: '/vacaciones', iconfull: ['fad', 'umbrella-beach'], clase: 'text-success' },
    { index: 3, title: 'Permisos', url: '/permisos', iconfull: ['fad', 'calendar-exclamation'], clase: 'text-warning' },
    { index: 4, title: 'Certificados', url: '/certificados', iconfull: ['fad', 'calendar-exclamation'], clase: 'text-primary' },
    { index: 5, title: 'Documentos', url: '/documentos', iconfull: ['fad', 'file-contract'], clase: 'text-info' },
    { index: 6, title: 'Pendientes de Firma', url: '/documentos/P', iconfull: ['fad', 'file-signature'], clase: 'text-info' },
  ];
