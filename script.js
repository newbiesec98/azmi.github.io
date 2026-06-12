/* -------------------------------------------------------------
 * SCRIPT.JS - Interactive Functions for Profile Website
 * Includes: Typing Effect, Mobile Menu, Theme Toggle, Sticky Nav,
 *           Active Section Tracker, and Contact Form Simulator.
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. TYPING EFFECT
    const typingText = document.getElementById('typing-text');
    const words = ["Web Developer", "UI/UX Designer", "Tech Enthusiast", "Static Web Specialist"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50; // Speed up deleting
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Word is fully typed, pause before deleting
            typeDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next word
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 500; // Pause before starting next word
        }

        setTimeout(type, typeDelay);
    }

    if (typingText) {
        type();
    }

    // 2. THEME TOGGLER (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('portfolio-theme', 'dark');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('portfolio-theme', 'light');
        }
    });

    // 3. STICKY NAV & HEADER SCROLL EFFECT
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. HAMBURGER MENU / MOBILE NAV
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 5. ACTIVE NAV LINK HIGHLIGHT ON SCROLL (Intersection Observer)
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies core viewport area
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 6. CONTACT FORM SIMULATION
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Set loading state
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Mengirim... <i class="fa-solid fa-spinner fa-spin"></i>';
            
            const nameInput = document.getElementById('form-name').value;
            const emailInput = document.getElementById('form-email').value;
            const messageInput = document.getElementById('form-message').value;

            // Simulate server response delay
            setTimeout(() => {
                // Mock success
                formFeedback.classList.remove('hidden', 'error');
                formFeedback.classList.add('success');
                formFeedback.textContent = `Terima kasih, ${nameInput}! Pesan Anda berhasil dikirim (Simulasi). Kami akan menghubungi Anda di ${emailInput} segera.`;
                
                // Reset form
                contactForm.reset();
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;

                // Hide message after 7 seconds
                setTimeout(() => {
                    formFeedback.classList.add('hidden');
                }, 7000);
            }, 1500);
        });
    }

    // 7. SMOOTH SCROLL BACK TO TOP
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    });
});
