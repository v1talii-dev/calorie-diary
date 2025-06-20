export type Route = {
  path: (...args: unknown[]) => string;
  name: string;
  isPrivate: boolean;
};

type RouteKeys = 'DIARY' | 'PROFILE' | 'LOGIN' | 'NOT_FOUND';

export const ROUTE: Record<RouteKeys, Route> = {
  DIARY: {
    path: () => `/`,
    name: 'Дневник',
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
