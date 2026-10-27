import { useState, useEffect, useCallback } from 'react';
import { AppRoute } from '../types';

export function parseRouteFromHash(hash: string): AppRoute {
  const clean = hash.replace(/^#\/?/, '').toLowerCase().trim();
  switch (clean) {
    case 'theory':
      return 'theory';
    case 'practice':
      return 'practice';
    case 'exam':
      return 'exam';
    case 'results':
      return 'results';
    case 'certificate':
      return 'certificate';
    case 'access':
      return 'access';
    case 'home':
    case '':
    default:
      return 'home';
  }
}

export function useRouter() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    if (typeof window === 'undefined') return 'home';
    return parseRouteFromHash(window.location.hash);
  });

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = parseRouteFromHash(window.location.hash);
      setCurrentRoute(newRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((route: AppRoute) => {
    const hash = route === 'home' ? '#/' : `#/${route}`;
    if (window.location.hash === hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = hash;
    }
  }, []);

  return { currentRoute, navigate };
}
