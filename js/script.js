// script.js

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const backToTopBtn = document.querySelector('.back-to-top-btn');
const contactForm = document.getElementById('kontakForm');
const revealElements = document.querySelectorAll('.reveal');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    // Show/hide back to top button
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Reveal animations
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
});

// Back to Top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const resultDiv = document.getElementById('result');
    const formData = new FormData(contactForm);
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        resultDiv.innerHTML = 'Pesan berhasil dikirim! Saya akan membalas segera.';
        resultDiv.className = 'form-result success';
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        // Show error message
        resultDiv.innerHTML = 'Terjadi kesalahan. Silakan coba lagi atau hubungi saya langsung via email.';
        resultDiv.className = 'form-result error';
        
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            resultDiv.innerHTML = '';
            resultDiv.className = 'form-result';
        }, 5000);
    }
});

// Project card toggle (alternative to hover on mobile)
document.querySelectorAll('.proyek-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cardInner = btn.closest('.card-inner');
        cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' 
            ? 'rotateY(0deg)' 
            : 'rotateY(180deg)';
    });
});

// Close project card when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (!e.target.closest('.proyek-card')) {
        document.querySelectorAll('.card-inner').forEach(card => {
            card.style.transform = 'rotateY(0deg)';
        });
    }
});

// Form validation
const validateForm = () => {
    let isValid = true;
    
    // Name validation
    const nameInput = document.getElementById('nama');
    const nameError = nameInput.nextElementSibling;
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Nama wajib diisi';
        isValid = false;
    } else {
        nameError.textContent = '';
    }
    
    // Email validation
    const emailInput = document.getElementById('email');
    const emailError = emailInput.nextElementSibling;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email wajib diisi';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Format email tidak valid';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    
    // Message validation
    const messageInput = document.getElementById('pesan');
    const messageError = messageInput.nextElementSibling;
    if (!messageInput.value.trim()) {
        messageError.textContent = 'Pesan wajib diisi';
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Pesan minimal 10 karakter';
        isValid = false;
    } else {
        messageError.textContent = '';
    }
    
    return isValid;
};

// Initialize animations on load
window.addEventListener('DOMContentLoaded', () => {
    // Trigger initial reveal
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();