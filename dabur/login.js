// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const rememberMe = document.getElementById('rememberMe');
    const loginBtn = document.getElementById('loginBtn');
    const googleLogin = document.getElementById('googleLogin');
    const facebookLogin = document.getElementById('facebookLogin');
    const notification = document.getElementById('notification');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = this.querySelector('i');
        if (type === 'password') {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberMe.checked;

        // Validate form
        if (!validateForm(email, password)) {
            return;
        }

        // Show loading state
        setLoadingState(true);

        // Simulate API call
        simulateLogin(email, password, remember)
            .then(user => {
                showNotification('Login successful! Redirecting...', 'success');
                
                // Store user session
                if (remember) {
                    localStorage.setItem('userRemembered', 'true');
                    localStorage.setItem('userEmail', email);
                } else {
                    sessionStorage.setItem('userLoggedIn', 'true');
                }
                
                // Redirect to dashboard or home page
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            })
            .catch(error => {
                showNotification(error.message, 'error');
                setLoadingState(false);
            });
    });

    // Social login handlers
    googleLogin.addEventListener('click', function() {
        showNotification('Redirecting to Google authentication...', 'success');
        // In real app: window.location.href = '/auth/google';
        setTimeout(() => {
            showNotification('Google login would be implemented here', 'success');
        }, 1000);
    });

    facebookLogin.addEventListener('click', function() {
        showNotification('Redirecting to Facebook authentication...', 'success');
        // In real app: window.location.href = '/auth/facebook';
        setTimeout(() => {
            showNotification('Facebook login would be implemented here', 'success');
        }, 1000);
    });

    // Form validation
    function validateForm(email, password) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showNotification('Please enter your email address', 'error');
            emailInput.focus();
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            emailInput.focus();
            return false;
        }

        // Password validation
        if (!password) {
            showNotification('Please enter your password', 'error');
            passwordInput.focus();
            return false;
        }

        if (password.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            passwordInput.focus();
            return false;
        }

        return true;
    }

    // Simulate login API call
    function simulateLogin(email, password, remember) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock validation - in real app, this would be an API call
                const validUsers = [
                    { email: 'user@dabur.com', password: 'password123', name: 'Demo User' },
                    { email: 'admin@dabur.com', password: 'admin123', name: 'Admin User' }
                ];

                const user = validUsers.find(u => u.email === email && u.password === password);
                
                if (user) {
                    // Store user data
                    const userData = {
                        email: user.email,
                        name: user.name,
                        loginTime: new Date().toISOString()
                    };
                    
                    if (remember) {
                        localStorage.setItem('userData', JSON.stringify(userData));
                    } else {
                        sessionStorage.setItem('userData', JSON.stringify(userData));
                    }
                    
                    resolve(userData);
                } else {
                    reject(new Error('Invalid email or password. Please try again.'));
                }
            }, 1500); // Simulate network delay
        });
    }

    // Loading state management
    function setLoadingState(isLoading) {
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');
        
        if (isLoading) {
            loginBtn.disabled = true;
            btnText.style.opacity = '0';
            btnLoader.style.display = 'block';
        } else {
            loginBtn.disabled = false;
            btnText.style.opacity = '1';
            btnLoader.style.display = 'none';
        }
    }

    // Notification system
    function showNotification(message, type = 'success') {
        // Clear existing notification
        notification.className = 'notification';
        notification.innerHTML = '';
        
        // Set content and style
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        
        const text = document.createElement('span');
        text.textContent = message;
        
        notification.appendChild(icon);
        notification.appendChild(text);
        notification.classList.add('show', type);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Check for remembered email
    function checkRememberedUser() {
        const remembered = localStorage.getItem('userRemembered');
        const savedEmail = localStorage.getItem('userEmail');
        
        if (remembered === 'true' && savedEmail) {
            emailInput.value = savedEmail;
            rememberMe.checked = true;
        }
    }

    // Input field animations
    function setupInputAnimations() {
        const inputs = document.querySelectorAll('.input-group input');
        
        inputs.forEach(input => {
            // Add focus class to parent
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check initial value
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }

    // Initialize page
    function init() {
        checkRememberedUser();
        setupInputAnimations();
        
        // Add CSS for input animations
        const style = document.createElement('style');
        style.textContent = `
            .input-group.focused i {
                color: var(--primary-green) !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('Dabur Login Page initialized');
    }

    // Start initialization
    init();
});