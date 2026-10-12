import { useEffect } from 'react';

/**
 * useDocumentTitle Hook
 * Updates document.title on route mount and reverts or updates cleanly
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | Aurelia Grand Resort` : 'Aurelia Grand Resort & Spa';
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};
