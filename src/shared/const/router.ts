export type Route = {
  path: (...args: unknown[]) => string;
  name: string;
  isPrivate: boolean;
};

type RouteKeys = 'HOME' | 'PROFILE' | 'LOGIN' | 'NOT_FOUND';

export const ROUTE: Record<RouteKeys, Route> = {
  HOME: {
    path: () => `/`,
    name: 'Главная',
    isPrivate: true
  },
  PROFILE: {
    path: () => `/profile`,
    name: 'Профиль',
    isPrivate: true
  },
  LOGIN: {
    path: () => `/login`,
    name: 'Вход',
    isPrivate: false
  },
  NOT_FOUND: {
    path: () => `*`,
    name: 'Страница не найдена',
    isPrivate: false
  }
};
