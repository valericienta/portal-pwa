import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconName } from '@fortawesome/pro-solid-svg-icons';

export const menu: {
  index: number;
  title: string;
  url: string;
  iconfull: IconName;
  accent: string;
}[] = [
  {
    index: 0,
    title: 'Inicio',
    url: '/home',
    iconfull: 'house',
    accent: '--inicio-accent',
  },
  {
    index: 1,
    title: 'Liquidaciones',
    url: '/liquidaciones',
    iconfull: 'file-contract',
    accent: '--liquidaciones-accent',
  },
  {
    index: 2,
    title: 'Documentos',
    url: '/documentos',
    iconfull: 'folder',
    accent: '--documentos-accent',
  },
  {
    index: 3,
    title: 'Vacaciones',
    url: '/vacaciones',
    iconfull: 'umbrella-beach',
    accent: '--vacaciones-accent',
  },
  {
    index: 4,
    title: 'Permisos',
    url: '/permisos',
    iconfull: 'calendar-range',
    accent: '--permisos-accent',
  },
  {
    index: 5,
    title: 'Certificados',
    url: '/certificados',
    iconfull: 'stamp',
    accent: '--certificados-accent',
  },

  // { index: 6, title: 'Pendientes de Firma', url: '/documentos/P', iconfull: ['fal', 'file-signature'], clase: 'text-info' },
];
