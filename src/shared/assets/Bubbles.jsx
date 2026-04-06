'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styled from '@emotion/styled';

const NUM_BALLS = 30;
const COLORS = ['#0053DC', '#2AB0E3', '#F5A000', '#CE2C20', '#F5A000'];
const BALL_SIZE = 50;
const SAFE_DISTANCE = 120;
const PUSH_DISTANCE = 80;
const BALL_COLLISION_DISTANCE = 50; // минимальное расстояние между шариками
const BALL_PUSH_FORCE = 30; // сила отталкивания между шариками
const MIN_MOVE_DISTANCE = 2; // минимальное расстояние для движения (чтобы избежать дрожания)
const MIN_MOUSE_MOVE_DISTANCE = 0.5; // минимальное расстояние для реакции на мышь (более чувствительно)

export const Bubbles = ({
    numBalls = NUM_BALLS,
}) => {
    const bubbleRefs = useRef([]);
    const collisionIntervalRef = useRef(null);
    bubbleRefs.current = [];
    const addToRefs = (el) => {
        if (el && !bubbleRefs.current.includes(el)) {
            bubbleRefs.current.push(el);
        }
    };

    useEffect(() => {
        const bubbles = bubbleRefs.current;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Флаг для отслеживания завершения начальной анимации
        let isInitialAnimationComplete = false;

        // создаём массив с конечными случайными позициями
        const targets = bubbles.map(() => ({
            x: Math.random() * (windowWidth - BALL_SIZE),
            y: Math.random() * (windowHeight - BALL_SIZE),
        }));

        // одновременно анимируем все шарики из центра экрана
        bubbles.forEach((bubble, i) => {
            const target = targets[i];

            // направление вылета: случайно слева/справа и сверху/снизу
            const fromX = Math.random() < 0.5 ? -BALL_SIZE - 50 : windowWidth + 50;
            const fromY = Math.random() < 0.5 ? -BALL_SIZE - 50 : windowHeight + 50;

            gsap.fromTo(bubble,
                { x: fromX, y: fromY, scale: 0 },
                {
                    x: target.x,
                    y: target.y,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power4.out'
                }
            );
        });

        // Функция для отталкивания шариков друг от друга
        const handleBallCollisions = () => {
            // Не проверяем столкновения во время начальной анимации
            if (!isInitialAnimationComplete) return;

            bubbles.forEach((bubble1, i) => {
                const rect1 = bubble1.getBoundingClientRect();
                const bx1 = rect1.left + BALL_SIZE / 2;
                const by1 = rect1.top + BALL_SIZE / 2;

                bubbles.forEach((bubble2, j) => {
                    if (i >= j) return; // избегаем двойной проверки

                    const rect2 = bubble2.getBoundingClientRect();
                    const bx2 = rect2.left + BALL_SIZE / 2;
                    const by2 = rect2.top + BALL_SIZE / 2;

                    const dx = bx1 - bx2;
                    const dy = by1 - by2;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < BALL_COLLISION_DISTANCE && dist > 0) {
                        const angle = Math.atan2(dy, dx);
                        const push = (BALL_COLLISION_DISTANCE - dist) / BALL_COLLISION_DISTANCE * BALL_PUSH_FORCE;

                        const currentX1 = gsap.getProperty(bubble1, 'x');
                        const currentY1 = gsap.getProperty(bubble1, 'y');
                        const currentX2 = gsap.getProperty(bubble2, 'x');
                        const currentY2 = gsap.getProperty(bubble2, 'y');

                        // Отталкиваем оба шарика в противоположные стороны
                        let targetX1 = currentX1 + Math.cos(angle) * push;
                        let targetY1 = currentY1 + Math.sin(angle) * push;
                        let targetX2 = currentX2 - Math.cos(angle) * push;
                        let targetY2 = currentY2 - Math.sin(angle) * push;

                        // Ограничиваем границами экрана
                        const clampedX1 = Math.min(Math.max(0, targetX1), windowWidth - BALL_SIZE);
                        const clampedY1 = Math.min(Math.max(0, targetY1), windowHeight - BALL_SIZE);
                        const clampedX2 = Math.min(Math.max(0, targetX2), windowWidth - BALL_SIZE);
                        const clampedY2 = Math.min(Math.max(0, targetY2), windowHeight - BALL_SIZE);

                        // Проверяем, действительно ли шарики могут сдвинуться
                        const moveDistance1 = Math.sqrt(
                            Math.pow(clampedX1 - currentX1, 2) + Math.pow(clampedY1 - currentY1, 2)
                        );
                        const moveDistance2 = Math.sqrt(
                            Math.pow(clampedX2 - currentX2, 2) + Math.pow(clampedY2 - currentY2, 2)
                        );

                        // Применяем анимацию только если движение достаточно большое
                        // и если шарик не находится уже в процессе анимации
                        if (moveDistance1 > MIN_MOVE_DISTANCE && !gsap.isTweening(bubble1)) {
                            gsap.to(bubble1, {
                                x: clampedX1,
                                y: clampedY1,
                                duration: 0.3,
                                ease: 'power2.out'
                            });
                        }

                        if (moveDistance2 > MIN_MOVE_DISTANCE && !gsap.isTweening(bubble2)) {
                            gsap.to(bubble2, {
                                x: clampedX2,
                                y: clampedY2,
                                duration: 0.3,
                                ease: 'power2.out'
                            });
                        }
                    }
                });
            });
        };

        const handleMove = (e) => {
            bubbles.forEach((bubble) => {
                const rect = bubble.getBoundingClientRect();
                const bx = rect.left + BALL_SIZE / 2;
                const by = rect.top + BALL_SIZE / 2;

                const dx = bx - e.clientX;
                const dy = by - e.clientY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < SAFE_DISTANCE) {
                    const angle = Math.atan2(dy, dx);
                    // Более плавное отталкивание - чем ближе мышь, тем сильнее отталкивание
                    const push = (SAFE_DISTANCE - dist) / SAFE_DISTANCE * PUSH_DISTANCE;

                    // Получаем текущую позицию (с учетом активной анимации)
                    const currentX = gsap.getProperty(bubble, 'x');
                    const currentY = gsap.getProperty(bubble, 'y');

                    // Вычисляем целевую позицию относительно текущей
                    let targetX = currentX + Math.cos(angle) * push;
                    let targetY = currentY + Math.sin(angle) * push;

                    // Ограничиваем границами экрана
                    const clampedX = Math.min(Math.max(0, targetX), windowWidth - BALL_SIZE);
                    const clampedY = Math.min(Math.max(0, targetY), windowHeight - BALL_SIZE);

                    // Проверяем, действительно ли шарик может сдвинуться
                    const moveDistance = Math.sqrt(
                        Math.pow(clampedX - currentX, 2) + Math.pow(clampedY - currentY, 2)
                    );

                    // Применяем анимацию только если движение достаточно большое
                    // Используем меньший порог для реакции на мышь для более плавного отклика
                    if (moveDistance > MIN_MOUSE_MOVE_DISTANCE) {
                        // Прерываем предыдущую анимацию и начинаем новую для плавного следования за мышью
                        gsap.killTweensOf(bubble, 'x,y');
                        gsap.to(bubble, {
                            x: clampedX,
                            y: clampedY,
                            duration: 0.3, // Более быстрая реакция
                            ease: 'power2.out'
                        });
                    }
                }
            });

            // Проверяем столкновения после движения мыши
            handleBallCollisions();
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', (e) => handleMove(e.touches[0]));

        // Запускаем проверку столкновений только после завершения начальной анимации
        const startCollisionCheck = setTimeout(() => {
            isInitialAnimationComplete = true;
            
            // Постоянная проверка столкновений между шариками
            collisionIntervalRef.current = setInterval(() => {
                handleBallCollisions();
            }, 100); // проверка каждые 100мс
        }, 1300); // немного больше чем duration анимации (1.2s)

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
            clearTimeout(startCollisionCheck);
            if (collisionIntervalRef.current) {
                clearInterval(collisionIntervalRef.current);
            }
        };
    }, []);

    return (
        <StyledContainer>
            {Array.from({ length: numBalls }).map((_, index) => {
                const color = COLORS[index % COLORS.length];
                return (
                    <div
                        key={index}
                        ref={addToRefs}
                        style={{
                            position: 'absolute',
                            width: `${BALL_SIZE}px`,
                            height: `${BALL_SIZE}px`,
                            borderRadius: '50%',
                            backgroundColor: color,
                            pointerEvents: 'none',
                        }}
                    />
                );
            })}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;