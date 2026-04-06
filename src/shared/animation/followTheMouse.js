import gsap from 'gsap';


export const createFollowMouseAnimation = (refs, config) => {
    return (e) => {
        refs.forEach((ref, index) => {
            if (!ref.current) return;

            const elementConfig = config[index];
            if (!elementConfig) return;
            
            // Получаем координаты текущего элемента
            const elementRect = ref.current.getBoundingClientRect();
            const elementCenterX = elementRect.left + elementRect.width / 2;
            const elementCenterY = elementRect.top + elementRect.height / 2;

            // Относительные координаты курсора
            const mouseX = e.clientX - elementCenterX;
            const mouseY = e.clientY - elementCenterY;

            // Ограничиваем движение
            const maxDistance = elementConfig.maxDistance || 5;
            const distance = Math.min(maxDistance, Math.sqrt(mouseX * mouseX + mouseY * mouseY));
            const angle = Math.atan2(mouseY, mouseX);
            const limitedX = Math.cos(angle) * distance;
            const limitedY = Math.sin(angle) * distance;

            // Анимируем элемент
            gsap.to(ref.current, {
                x: limitedX,
                y: limitedY,
                duration: elementConfig.duration || 0.2,
                ease: elementConfig.ease || 'power3.out',
            });
        });
    };
};


export const createSingleFollowMouseAnimation = (ref, options = {}) => {
    const defaultOptions = {
        maxDistance: 5,
        duration: 0.2,
        ease: 'power3.out'
    };

    const config = { ...defaultOptions, ...options };

    return (e) => {
        if (!ref.current) return;
        
        // Получаем координаты элемента
        const elementRect = ref.current.getBoundingClientRect();
        const elementCenterX = elementRect.left + elementRect.width / 2;
        const elementCenterY = elementRect.top + elementRect.height / 2;

        // Относительные координаты курсора
        const mouseX = e.clientX - elementCenterX;
        const mouseY = e.clientY - elementCenterY;

        // Ограничиваем движение
        const distance = Math.min(config.maxDistance, Math.sqrt(mouseX * mouseX + mouseY * mouseY));
        const angle = Math.atan2(mouseY, mouseX);
        const limitedX = Math.cos(angle) * distance;
        const limitedY = Math.sin(angle) * distance;

        // Анимируем элемент
        gsap.to(ref.current, {
            x: limitedX,
            y: limitedY,
            duration: config.duration,
            ease: config.ease,
        });
    };
};
