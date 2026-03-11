import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (callback: () => void, isLoading: boolean) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loaderRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [callback, isLoading]);

  return loaderRef;
};