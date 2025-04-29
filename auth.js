// Initialize users array from localStorage or create empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Registration form handling
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const userType = document.getElementById('userType').value;

        // Validate form
        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'error');
            return;
        }

        // Check if email already exists
        if (users.some(user => user.email === email)) {
            showAlert('Email already registered', 'error');
            return;
        }

        // Create new user object
        const newUser = {
            id: Date.now(),
            fullName,
            email,
            password, // In a real app, this should be hashed
            userType,
            createdAt: new Date().toISOString()
        };

        // Add user to array and save to localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message and redirect
        showAlert('Registration successful!', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
}

// Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember')?.checked;

        // Find user
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Create session
            const session = {
                userId: user.id,
                email: user.email,
                fullName: user.fullName,
                userType: user.userType,
                timestamp: new Date().toISOString()
            };

            // Save session
            if (remember) {
                localStorage.setItem('session', JSON.stringify(session));
            } else {
                sessionStorage.setItem('session', JSON.stringify(session));
            }

            // Show success message and redirect
            showAlert('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showAlert('Invalid email or password', 'error');
        }
    });
}

// Check if user is logged in
function checkAuth() {
    const session = JSON.parse(localStorage.getItem('session') || sessionStorage.getItem('session'));
    return session;
}

// Logout function
function logout() {
    localStorage.removeItem('session');
    sessionStorage.removeItem('session');
    window.location.href = 'login.html';
}

// Alert function
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    // Style the alert
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '1rem 2rem';
    alertDiv.style.borderRadius = '0.5rem';
    alertDiv.style.color = 'white';
    alertDiv.style.fontWeight = '500';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    alertDiv.style.animation = 'slideIn 0.3s ease-out';

    // Set background color based on type
    alertDiv.style.backgroundColor = type === 'success' ? '#10B981' : '#EF4444';

    document.body.appendChild(alertDiv);

    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Update navigation based on auth status
document.addEventListener('DOMContentLoaded', function() {
    const session = checkAuth();
    const authButtons = document.querySelector('.auth-buttons');
    
    if (session) {
        // User is logged in
        authButtons.innerHTML = `
            <span class="user-greeting">Welcome, ${session.fullName}</span>
            <button class="btn logout-btn" onclick="logout()">Logout</button>
        `;
    }
}); 