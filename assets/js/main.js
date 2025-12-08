// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Header scroll animation
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Active menu item based on current page
    const currentPage = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
            link.classList.add('active');
        }
    });
    
    // Animated counters
    const animateCounter = (element, target, suffix = '', duration = 2000, isDecimal = false) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                if (isDecimal) {
                    element.textContent = target.toFixed(1) + suffix;
                } else {
                    element.textContent = Math.floor(target) + suffix;
                }
                clearInterval(timer);
            } else {
                if (isDecimal) {
                    element.textContent = start.toFixed(1) + suffix;
                } else {
                    element.textContent = Math.floor(start) + suffix;
                }
            }
        }, 16);
    };
    
    // Intersection Observer for counters
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const targetValue = entry.target.getAttribute('data-target');
                const target = parseFloat(targetValue);
                const suffix = entry.target.getAttribute('data-suffix') || '';
                
                // Handle decimal numbers (like 4.8)
                if (targetValue.includes('.')) {
                    animateCounter(entry.target, target, suffix, 2000, true);
                } else {
                    animateCounter(entry.target, target, suffix);
                }
            }
        });
    }, observerOptions);
    
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Particle Network Background
    const particlesCanvas = document.getElementById('particles-canvas');
    if (particlesCanvas) {
        const ctx = particlesCanvas.getContext('2d');
        let particles = [];
        let animationFrameId;
        
        // Set canvas size
        function resizeCanvas() {
            particlesCanvas.width = particlesCanvas.offsetWidth;
            particlesCanvas.height = particlesCanvas.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * particlesCanvas.width;
                this.y = Math.random() * particlesCanvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > particlesCanvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > particlesCanvas.height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
                ctx.fill();
            }
        }
        
        // Create particles
        const particleCount = Math.floor((particlesCanvas.width * particlesCanvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Draw connections
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            drawConnections();
            
            animationFrameId = requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        });
    }
    
    // Particle Network Background for Industries Section
    const particlesCanvasIndustries = document.getElementById('particles-canvas-industries');
    if (particlesCanvasIndustries) {
        const ctxIndustries = particlesCanvasIndustries.getContext('2d');
        let particlesIndustries = [];
        let animationFrameIdIndustries;
        
        // Set canvas size
        function resizeCanvasIndustries() {
            particlesCanvasIndustries.width = particlesCanvasIndustries.offsetWidth;
            particlesCanvasIndustries.height = particlesCanvasIndustries.offsetHeight;
        }
        
        resizeCanvasIndustries();
        window.addEventListener('resize', resizeCanvasIndustries);
        
        // Particle class
        class ParticleIndustries {
            constructor() {
                this.x = Math.random() * particlesCanvasIndustries.width;
                this.y = Math.random() * particlesCanvasIndustries.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > particlesCanvasIndustries.width) this.vx *= -1;
                if (this.y < 0 || this.y > particlesCanvasIndustries.height) this.vy *= -1;
            }
            
            draw() {
                ctxIndustries.beginPath();
                ctxIndustries.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctxIndustries.fillStyle = 'rgba(0, 212, 255, 0.5)';
                ctxIndustries.fill();
            }
        }
        
        // Create particles
        const particleCountIndustries = Math.floor((particlesCanvasIndustries.width * particlesCanvasIndustries.height) / 15000);
        for (let i = 0; i < particleCountIndustries; i++) {
            particlesIndustries.push(new ParticleIndustries());
        }
        
        // Draw connections
        function drawConnectionsIndustries() {
            for (let i = 0; i < particlesIndustries.length; i++) {
                for (let j = i + 1; j < particlesIndustries.length; j++) {
                    const dx = particlesIndustries[i].x - particlesIndustries[j].x;
                    const dy = particlesIndustries[i].y - particlesIndustries[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctxIndustries.beginPath();
                        ctxIndustries.moveTo(particlesIndustries[i].x, particlesIndustries[i].y);
                        ctxIndustries.lineTo(particlesIndustries[j].x, particlesIndustries[j].y);
                        ctxIndustries.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 150)})`;
                        ctxIndustries.lineWidth = 0.5;
                        ctxIndustries.stroke();
                    }
                }
            }
        }
        
        // Animation loop
        function animateIndustries() {
            ctxIndustries.clearRect(0, 0, particlesCanvasIndustries.width, particlesCanvasIndustries.height);
            
            particlesIndustries.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            drawConnectionsIndustries();
            
            animationFrameIdIndustries = requestAnimationFrame(animateIndustries);
        }
        
        // Start animation
        animateIndustries();
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (animationFrameIdIndustries) {
                cancelAnimationFrame(animationFrameIdIndustries);
            }
        });
    }
    
    // Particle Network Background for Formations Page
    const particlesCanvasFormations = document.getElementById('particles-canvas-formations');
    if (particlesCanvasFormations) {
        initParticleNetwork(particlesCanvasFormations, 'particles-canvas-formations');
    }
    
    // Particle Network Background for About Page
    const particlesCanvasAbout = document.getElementById('particles-canvas-about');
    if (particlesCanvasAbout) {
        initParticleNetwork(particlesCanvasAbout, 'particles-canvas-about');
    }
    
    // Particle Network Background for Contact Page
    const particlesCanvasContact = document.getElementById('particles-canvas-contact');
    if (particlesCanvasContact) {
        initParticleNetwork(particlesCanvasContact, 'particles-canvas-contact');
    }
    
    // Generic Particle Network Initialization Function
    function initParticleNetwork(canvas, id) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
                ctx.fill();
            }
        }
        
        // Create particles
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Draw connections
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            drawConnections();
            
            animationFrameId = requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        });
    }
});

