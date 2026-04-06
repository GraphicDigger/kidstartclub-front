'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Stack } from '@/shared/uiKit/Stack';

export const Eyes = ({ size = 40 }) => {
  const eyesRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!eyesRef.current) return;

      // Получаем координаты контейнера глаз
      const eyesRect = eyesRef.current.getBoundingClientRect();
      const eyesCenterX = eyesRect.left + eyesRect.width / 2;
      const eyesCenterY = eyesRect.top + eyesRect.height / 2;

      // Рассчитываем относительные координаты курсора
      const mouseX = e.clientX - eyesCenterX;
      const mouseY = e.clientY - eyesCenterY;

      // Ограничиваем движение зрачков
      const maxDistance = 20;
      const distance = Math.min(maxDistance, Math.sqrt(mouseX * mouseX + mouseY * mouseY));
      const angle = Math.atan2(mouseY, mouseX);
      const limitedX = Math.cos(angle) * distance;
      const limitedY = Math.sin(angle) * distance;

      // Анимируем зрачки
      gsap.to(leftPupilRef.current, {
        x: limitedX,
        y: limitedY,
        duration: 0.2,
        ease: 'power3.out',
      });
      gsap.to(rightPupilRef.current, {
        x: limitedX,
        y: limitedY,
        duration: 0.2,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <Stack ref={eyesRef} direction="row" gap={0}>
      <svg width={size} height={size} viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42 2C18.3831 2 1 18.9329 1 42.0038C1 65.0746 18.3831 82 42 82C65.6169 82 83 65.0671 83 42.0038C83 18.9404 65.6057 2 42 2Z" fill="white" />
        <path ref={leftPupilRef} d="M41.1468 55.3513C32.9972 55.3513 27 49.5614 27 41.6756C27 33.7899 32.9972 28 41.1468 28C49.2964 28 55.2937 33.7899 55.2937 41.6756C55.2937 49.5614 49.2927 55.3513 41.1468 55.3513Z" fill="#111111" />
      </svg>
      <svg width={size} height={size} viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42 2C18.3831 2 1 18.9329 1 42.0038C1 65.0746 18.3831 82 42 82C65.6169 82 83 65.0671 83 42.0038C83 18.9404 65.6057 2 42 2Z" fill="white" />
        <path ref={rightPupilRef} d="M41.1468 55.3513C32.9972 55.3513 27 49.5614 27 41.6756C27 33.7899 32.9972 28 41.1468 28C49.2964 28 55.2937 33.7899 55.2937 41.6756C55.2937 49.5614 49.2927 55.3513 41.1468 55.3513Z" fill="#111111" />
      </svg>
    </Stack>
  );
};