import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
      if (follower) {
        // Delay for the follower
        setTimeout(() => {
          if (follower) {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
          }
        }, 80);
      }
    };

    const onMouseDown = () => {
      cursor?.classList.add('active');
      follower?.classList.add('active');
    };

    const onMouseUp = () => {
      cursor?.classList.remove('active');
      follower?.classList.remove('active');
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    // Hover logic
    const addHover = () => {
      cursor?.classList.add('hover');
      follower?.classList.add('hover');
    };
    
    const removeHover = () => {
      cursor?.classList.remove('hover');
      follower?.classList.remove('hover');
    };

    // Use event delegation for hover effects
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .service-card, .project-card, input, textarea, .hover-target')) {
        addHover();
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .service-card, .project-card, input, textarea, .hover-target')) {
        removeHover();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  );
}
