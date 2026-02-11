import { useEffect, useState } from 'react';

interface UseIntersectionObserverOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useIntersectionObserver(
    targetId: string,
    options: UseIntersectionObserverOptions = {}
) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    const {
        threshold = 0.3,
        rootMargin = '0px 0px -100px 0px',
        triggerOnce = false
    } = options;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target.id === targetId) {
                        if (entry.isIntersecting) {
                            setIsVisible(true);
                            if (triggerOnce) {
                                setHasTriggered(true);
                            }
                        } else if (!triggerOnce || !hasTriggered) {
                            setIsVisible(false);
                        }
                    }
                });
            },
            { threshold, rootMargin }
        );

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            observer.observe(targetElement);
        }

        return () => {
            if (targetElement) {
                observer.unobserve(targetElement);
            }
        };
    }, [targetId, threshold, rootMargin, triggerOnce, hasTriggered]);

    return isVisible;
}