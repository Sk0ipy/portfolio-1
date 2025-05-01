// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Theme switcher functionality
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'light';
}

// Handle theme switch
themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Skills Configuration - Easy to edit
const skillsConfig = {
    categories: [
        {
            name: 'Frontend Development',
            icon: 'fa-code',
            skills: [
                { name: 'HTML5', level: 55 },
                { name: 'CSS3', level: 50 },
                { name: 'JavaScript', level: 53 }
            ]
        },
        {
            name: 'Backend Development',
            icon: 'fa-server',
            skills: [
                { name: 'PHP', level: 60 },
                { name: 'Python', level: 75 },
                { name: 'MySQL', level: 55 },
                { name: 'C#', level: 70 },
                { name: 'C++', level: 40 }
            ]
        },
<<<<<<< Updated upstream
=======
        {
            name: 'Security & DevOps',
            icon: 'fa-shield-alt',
            skills: [
                { name: 'Network Security', level: 70 },
                { name: 'Docker', level: 45 },
                { name: 'Git', level: 85 }
            ]
        }
>>>>>>> Stashed changes
    ]
};

// Function to get skill level text based on percentage
const getSkillLevel = (level) => {
    if (level >= 90) return 'Advanced';
    if (level >= 75) return 'Proficient';
    if (level >= 60) return 'Intermediate';
    return 'Basic';
};

// Function to render skills
const renderSkills = () => {
    const container = document.getElementById('skills-container');
    if (!container) return;

    const skillsHTML = skillsConfig.categories.map(category => `
        <div class="skills-category">
            <div class="category-header">
                <i class="fas ${category.icon}"></i>
                <h3>${category.name}</h3>
            </div>
            <div class="skills-grid">
                ${category.skills.map(skill => `
                    <div class="skill-item" data-skill="${skill.name}" data-level="${skill.level}">
                        <div class="skill-info">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-level">${getSkillLevel(skill.level)}</span>
                        </div>
                        <div class="skill-bar"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    container.innerHTML = skillsHTML;

    // Initialize skill animations
    const skillItems = document.querySelectorAll('.skill-item[data-skill]');
    const skillsObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItem = entry.target;
                    const level = skillItem.dataset.level;
                    skillItem.style.setProperty('--level', level);
                    observer.unobserve(skillItem);
                }
            });
        },
        { threshold: 0.5 }
    );

    skillItems.forEach(item => {
        skillsObserver.observe(item);
    });
};

// Animate skill bars when they come into view
const skillItems = document.querySelectorAll('.skill-item[data-skill]');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItem = entry.target;
            const level = skillItem.dataset.level;
            skillItem.style.setProperty('--level', level);
            observer.unobserve(skillItem);
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

skillItems.forEach(item => {
    skillsObserver.observe(item);
});

// Typing animation
const typedTextSpan = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');

const roles = [
    'Software Developer',
    'Cybersecurity Enthusiast',
    'Full Stack Developer',
    'Creative Web Builder',
    'Hobby Game Developer',
    'UI/UX Minimalist',
    'Problem Solver'
];

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

// Show button when scrolling down
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Smooth scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Create loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Send email using EmailJS
            await emailjs.send(
                'service_bcb4lrq',
                'template_i6wco0r',
                {
                    to_name: "Owen",  
                    name: data.name,  
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    reply_to: data.email
                }
            );
            
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Show error state
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
            submitBtn.style.backgroundColor = '#ff4444';
            console.error('Email error:', error);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    const shouldDelete = isDeleting;
    const currentChar = charIndex;

    if (!isWaiting) {
        if (!shouldDelete && currentChar < currentRole.length) {
            typedTextSpan.textContent = currentRole.substring(0, currentChar + 1);
            charIndex++;
        } else if (shouldDelete && currentChar > 0) {
            typedTextSpan.textContent = currentRole.substring(0, currentChar - 1);
            charIndex--;
        } else if (shouldDelete && currentChar === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        } else if (!shouldDelete && currentChar === currentRole.length) {
            isWaiting = true;
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
            }, 2000); // Wait 2 seconds before deleting
        }
    }

    const typingSpeed = isDeleting ? 50 : 100; // Faster deletion, slower typing
    setTimeout(typeEffect, typingSpeed);
}

// Start the typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typedTextSpan) {
        setTimeout(typeEffect, 1000); // Start after 1 second
    }
    renderSkills();
});

// Mouse tracking for hobby cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.hobby-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
            
            // Calculate tilt based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((e.clientX - rect.left) - centerX) / 20;
            const rotateX = (centerY - (e.clientY - rect.top)) / 20;
            
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
});
