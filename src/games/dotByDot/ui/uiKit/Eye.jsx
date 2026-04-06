'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useDots } from '@/games/dotByDot/model';

export const Eye = () => {

  const { isRowComplete } = useDots();

  const eyesRef = useRef(null);
  const pupilRef = useRef(null);

  useEffect(() => {
    if (isRowComplete) {
      const tl = gsap.timeline({ repeat: 0, yoyo: true });

      tl.to(pupilRef.current, {
        x: 10,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      tl.to(pupilRef.current, {
        duration: 0.5, // просто "зависает" без движения
        x: 10,
        ease: 'none',
      });

      tl.to(pupilRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      tl.to(pupilRef.current, {
        duration: 0.5,
        x: 0,
        ease: 'none',
      });
    }
  }, [isRowComplete]);


  return (


    <svg ref={eyesRef} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C8.47721 0 0 8.46858 0 20.0025C0 31.5364 8.48206 40 20 40C31.5179 40 40 31.5314 40 20.0025C40 8.4736 31.5179 0 20 0Z" fill="white" />
      <path ref={pupilRef} d="M13 19.818C13 23.7513 15.8904 26.636 19.8186 26.636C23.7469 26.636 26.6373 23.7513 26.6373 19.818C26.6373 15.8847 23.7469 13 19.8186 13C15.8904 13 13 15.8847 13 19.818Z" fill="#222222" />
    </svg>



  );
};