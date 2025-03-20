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

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.progress-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const percent = entry.target.dataset.percent;
            entry.target.style.setProperty('--percent', `${percent}%`);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Skills data - Easy to maintain and update
const skills = [
    { name: 'HTML & CSS', rating: 3 },
    { name: 'JavaScript', rating: 3.5 },
    { name: 'PHP', rating: 4 },
    { name: 'Python', rating: 4 },
    { name: 'C#', rating: 4 },
    { name: 'C++', rating: 3 },
];

// Function to generate star HTML based on rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Function to render skills
function renderSkills() {
    const skillsWrapper = document.getElementById('skills-wrapper');
    if (!skillsWrapper) return;

    skillsWrapper.innerHTML = skills.map((skill, index) => `
        <div class="skill-tag" style="--i: ${index}">
            <span class="skill-name">${skill.name}</span>
            <div class="stars">
                ${generateStars(skill.rating)}
            </div>
        </div>
    `).join('');
}

// Typing animation
const typedTextSpan = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');

const roles = [
    'Web Developer & Designer',
    'Cybersecurity Enthusiast',
    'Software Developer',
    'Problem Solver',
    'Full Stack Developer'
];

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

    renderSkills();
});

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

        // Simulate sending (replace this with your actual form handling)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 2000);
            
        } catch (error) {
            // Show error state
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
            submitBtn.style.backgroundColor = '#f44336';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}
