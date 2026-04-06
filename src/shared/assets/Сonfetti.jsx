'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styled from '@emotion/styled';

const NUM_CONFETTI = 300;
const COLORS = ['#0053DC', '#2AB0E3', '#F5A000', '#CE2C20', '#F5A000'];
const CONFETTI_SIZE = 5;

export const Confetti = () => {
    const confettiRefs = useRef([]);
    confettiRefs.current = [];

    const addToRefs = (el) => {
        if (el && !confettiRefs.current.includes(el)) {
            confettiRefs.current.push(el);
        }
    };

    useEffect(() => {
        const confetti = confettiRefs.current;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (confetti.length === 0 || confetti[0].hasAnimation) return;
        confetti.forEach((p) => (p.hasAnimation = true));

        const pieces = confetti.map((piece, i) => {
            const isLeft = i % 2 === 0;
            const startX = isLeft ? 0 : windowWidth;
            const startY = windowHeight - CONFETTI_SIZE;

            // угол: левая стреляет вправо-вверх, правая — влево-вверх
            const angle = isLeft
                ? Math.random() * (Math.PI / 3) + Math.PI / 6 // 30°–60°
                : Math.PI - (Math.random() * (Math.PI / 3) + Math.PI / 6); // 120°–150°

            const speed = Math.random() * 1500 + 1000;
            const velocityX = Math.cos(angle) * speed;
            const velocityY = -Math.sin(angle) * speed;

            return {
                el: piece,
                x: startX,
                y: startY,
                vx: velocityX,
                vy: velocityY,
                rotation: (Math.random() - 0.5) * 1080,
                rotationSpeed: (Math.random() - 0.5) * 8,
                gravity: 1800,
            };
        });

        const update = () => {
            const dt = 1 / 60;
            pieces.forEach((p) => {
                p.vy += p.gravity * dt;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.rotation += p.rotationSpeed;

                gsap.set(p.el, {
                    x: p.x,
                    y: p.y,
                    rotation: p.rotation,
                });
            });

            if (pieces.every((p) => p.y > windowHeight + 100)) {
                gsap.ticker.remove(update);
                confetti.forEach((p) => (p.hasAnimation = false));
            }
        };

        // ⏳ задержка перед стартом — 1 секунда
        const startTimeout = setTimeout(() => {
            gsap.ticker.add(update);
        }, 500);

        return () => {
            clearTimeout(startTimeout);
            gsap.ticker.remove(update);
            confetti.forEach((p) => (p.hasAnimation = false));
        };
    }, []);

    return (
        <StyledContainer>
            {Array.from({ length: NUM_CONFETTI }).map((_, index) => {
                const color = COLORS[index % COLORS.length];
                return (
                    <div
                        key={index}
                        ref={addToRefs}
                        style={{
                            position: 'absolute',
                            width: `${CONFETTI_SIZE}px`,
                            height: `${CONFETTI_SIZE}px`,
                            borderRadius: '50%',
                            backgroundColor: color,
                            pointerEvents: 'none',
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
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
    overflow: hidden;
    z-index: 1;
`;