import { useEffect, useState } from 'react';

/** Quantos cards aparecem por vez, conforme a largura da viewport. */
export function useVisibleSlides(): number {
  const [visible, setVisible] = useState(() => calculateVisible());

  useEffect(() => {
    function handleResize() {
      setVisible(calculateVisible());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return visible;
}

function calculateVisible(): number {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  if (window.innerWidth <= 1024) return 3;
  return 4;
}
