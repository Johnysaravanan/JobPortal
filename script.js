// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Job Search Functionality
const searchForm = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-box input');
const jobsContainer = document.querySelector('.jobs-grid');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm) {
        const jobCards = document.querySelectorAll('.job-card');
        let foundJobs = false;

        jobCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const company = card.querySelector('.company').textContent.toLowerCase();
            const location = card.querySelector('.location').textContent.toLowerCase();
            const type = card.querySelector('.type').textContent.toLowerCase();

            if (title.includes(searchTerm) || 
                company.includes(searchTerm) || 
                location.includes(searchTerm) || 
                type.includes(searchTerm)) {
                card.style.display = 'flex';
                foundJobs = true;
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });

        // Show no results message if no jobs found
        const noResults = document.querySelector('.no-results');
        if (!foundJobs) {
            if (!noResults) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = `
                    <h3>No jobs found</h3>
                    <p>Try adjusting your search terms or filters</p>
                `;
                jobsContainer.appendChild(message);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }
});

// Apply Button Animation
document.querySelectorAll('.apply-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add loading state
        const originalText = this.innerHTML;
        this.innerHTML = `
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Applying...
        `;
        this.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.innerHTML = `
                <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Applied
            `;
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }, 1500);
    });
});

// Smooth Scrolling
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

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.job-card, .company-card').forEach(element => {
    observer.observe(element);
});

// Add CSS class for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Company Logo Hover Effect
document.querySelectorAll('.company-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const logo = card.querySelector('.company-logo');
        logo.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        const logo = card.querySelector('.company-logo');
        logo.style.transform = 'scale(1)';
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
`;
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

// Add styles for scroll to top button
const scrollToTopStyle = document.createElement('style');
scrollToTopStyle.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--primary-color);
        color: white;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        border: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .scroll-to-top:hover {
        background: var(--secondary-color);
        transform: translateY(-2px);
    }
    
    .scroll-to-top.visible {
        opacity: 1;
    }
`;
document.head.appendChild(scrollToTopStyle);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 

// Hero Section Scroll Animation
const hero = document.querySelector('.hero');
const featuredJobs = document.querySelector('.featured-jobs');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroHeight = hero.offsetHeight;
    const featuredJobsTop = featuredJobs.offsetTop;

    // Calculate when to start the fade effect
    const fadeStart = featuredJobsTop - heroHeight;
    
    if (scrollPosition > fadeStart) {
        hero.classList.add('fade-out');
    } else {
        hero.classList.remove('fade-out');
    }
}); 