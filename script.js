// Part 1 & 2: JavaScript Event Handling and Interactive Elements

document.addEventListener('DOMContentLoaded', () => {

    // --- Interactive Feature 1: Light/Dark Mode Toggle ---
    const modeToggleBtn = document.getElementById('mode-toggle');
    const body = document.body;

    // Check for a saved mode in localStorage on page load
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode) {
        body.classList.add(savedMode);
    }

    // Add a click event listener to the toggle button
    modeToggleBtn.addEventListener('click', () => {
        // Toggle the 'dark-mode' class on the body
        body.classList.toggle('dark-mode');

        // Save the current mode to localStorage
        const currentMode = body.classList.contains('dark-mode') ? 'dark-mode' : '';
        localStorage.setItem('theme-mode', currentMode);
    });

    // --- Interactive Feature 2: Collapsible FAQ Section ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    // Loop through each question to add an event listener
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Find the answer sibling element
            const answer = question.nextElementSibling;
            
            // Toggle the 'show' class on the answer to display/hide it
            answer.classList.toggle('show');

            // Toggle the 'active' class on the question to change the +/- icon
            question.classList.toggle('active');
        });
    });

    // --- Part 3: Form Validation with JavaScript ---

    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('form-message');

    /**
     * @param {string} inputId The ID of the input field
     * @param {string} message The error message to display
     */
    const showValidationError = (inputId, message) => {
        const errorElement = document.getElementById(`${inputId}-error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    };

    /**
     * @param {string} inputId The ID of the input field
     */
    const hideValidationError = (inputId) => {
        const errorElement = document.getElementById(`${inputId}-error`);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    };

    /**
     * @param {string} message The message to show (success or error)
     * @param {boolean} isSuccess True for success, false for error
     */
    const showFormFeedback = (message, isSuccess) => {
        formMessage.textContent = message;
        formMessage.style.display = 'block';
        formMessage.className = isSuccess ? 'success' : 'error';
    };

    // Add a submit event listener to the form
    form.addEventListener('submit', (event) => {
        // Prevent the default form submission (page reload)
        event.preventDefault();

        // Assume the form is valid initially
        let isValid = true;
        
        // --- Validation Logic ---

        // Name field validation: must not be empty
        if (nameInput.value.trim() === '') {
            showValidationError('name', 'Name is required.');
            isValid = false;
        } else {
            hideValidationError('name');
        }

        // Email field validation: must not be empty and must be a valid email format
        // Using a simple regular expression for a basic check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showValidationError('email', 'Email is required.');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showValidationError('email', 'Please enter a valid email address.');
            isValid = false;
        } else {
            hideValidationError('email');
        }

        // Message field validation: must not be empty
        if (messageInput.value.trim() === '') {
            showValidationError('message', 'Message cannot be empty.');
            isValid = false;
        } else {
            hideValidationError('message');
        }

        // --- Handle Form Submission ---

        if (isValid) {
            // Simulate a successful form submission (e.g., sending data to a server)
            showFormFeedback('Form submitted successfully!', true);

            // Clear the form fields after a successful submission
            form.reset();
        } else {
            // If the form is not valid, display a generic error message
            showFormFeedback('Please correct the errors and try again.', false);
        }
    });

});
