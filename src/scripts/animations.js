import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function initAllAnimations() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        if (!ctx) return;
        let particles = [];
        const particleColor = 'rgba(208, 34, 36, 0.2)';
        const lineColor = 'rgba(208, 34, 36, 0.05)';
        const resizeCanvas = () => { heroCanvas.width = window.innerWidth; heroCanvas.height = window.innerHeight; createParticles(); };
        const createParticles = () => {
            particles = [];
            const pCount = Math.floor((heroCanvas.width * heroCanvas.height) / 15000);
            for (let i = 0; i < pCount; i++) particles.push({ x: Math.random() * heroCanvas.width, y: Math.random() * heroCanvas.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, radius: Math.random() * 1.5 + 1 });
        };
        const animate = () => {
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                p1.x += p1.vx; p1.y += p1.vy;
                if (p1.x < -10) p1.x = heroCanvas.width + 10; if (p1.x > heroCanvas.width + 10) p1.x = -10;
                if (p1.y < -10) p1.y = heroCanvas.height + 10; if (p1.y > heroCanvas.height + 10) p1.y = -10;
                ctx.beginPath(); ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2); ctx.fillStyle = particleColor; ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                    if (d < 150) { ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.strokeStyle = lineColor; ctx.lineWidth = 1 - d / 150; ctx.stroke(); }
                }
            }
            requestAnimationFrame(animate);
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
        gsap.from("#hero-text-container", { duration: 1, opacity: 0, y: 20, delay: 0.2, ease: "power3.out" });
        gsap.from("#hero-subtitle", { duration: 1, opacity: 0, y: 20, delay: 0.4, ease: "power3.out" });
        gsap.to("#scroll-indicator", { duration: 1, opacity: 1, delay: 1.5, ease: "power3.out" });
    }

    // --- Staggered Animation for Portfolio Items ---
    const portfolioItems = gsap.utils.toArray('.portfolio-item');
    if (portfolioItems.length > 0) {
        gsap.from(portfolioItems, {
            duration: 0.8,
            opacity: 0,
            y: 50,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".portfolio-grid-container",
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        });
    }

    // --- General Scroll Animations for other elements ---
    const otherAnimatedElements = gsap.utils.toArray('.newsletter-content, .about-content, .contact-content, .footer-anim, .content-fade-in');
    otherAnimatedElements.forEach((elem) => {
        gsap.from(elem, {
            duration: 1,
            opacity: 0,
            y: 50,
            ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

initAllAnimations();
document.addEventListener('astro:page-load', initAllAnimations);