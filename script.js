document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.proposal-step');
    const navButtons = document.querySelectorAll('.nav-btn, .nav-btn-secondary');
    const generateBtn = document.getElementById('generate-cert-btn');
    const printBtn = document.getElementById('print-btn');

    let currentStep = 1;

    // --- UTILITY FUNCTIONS ---
    const showStep = (stepNumber) => {
        steps.forEach(step => step.classList.remove('active'));
        const activeStep = document.getElementById(`step-${stepNumber}`);
        if (activeStep) {
            activeStep.classList.add('active');
        }
    };

    const clearError = (input) => {
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.textContent = '';
        }
    };

    const showError = (input, message) => {
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.textContent = message;
        }
    };

    // --- VALIDATION LOGIC ---
    const validateStep = (stepNumber) => {
        let isValid = true;
        const currentStepFields = document.querySelectorAll(`#step-${stepNumber} input, #step-${stepNumber} textarea`);

        currentStepFields.forEach(field => {
            clearError(field);
            if (field.value.trim() === '') {
                isValid = false;
                showError(field, 'This beautiful detail is needed to continue your story.');
            }
        });

        return isValid;
    };

    // --- NAVIGATION HANDLING ---
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.next) {
                if (validateStep(currentStep)) {
                    currentStep = parseInt(button.dataset.next, 10);
                    showStep(currentStep);
                }
            } else if (button.dataset.prev) {
                currentStep = parseInt(button.dataset.prev, 10);
                showStep(currentStep);
            }
        });
    });

    // --- CERTIFICATE GENERATION ---
    const generateCertificate = () => {
        // Final validation before generation
        if (!validateStep(3)) return; 

        // Collect all data
        const partner1Name = document.getElementById('partner1-name').value.trim();
        const partner2Name = document.getElementById('partner2-name').value.trim();
        const duration = document.getElementById('relationship-duration').value.trim();
        const promise1 = document.getElementById('promise1').value.trim();
        const promise2 = document.getElementById('promise2').value.trim();
        const commitDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Populate certificate fields
        document.getElementById('cert-partner1-name').textContent = partner1Name;
        document.getElementById('cert-partner2-name').textContent = partner2Name;
        document.getElementById('cert-sig1-name').textContent = partner1Name;
        document.getElementById('cert-sig2-name').textContent = partner2Name;
        document.getElementById('cert-duration').textContent = duration;
        document.getElementById('cert-promise1').textContent = `“${promise1}”`;
        document.getElementById('cert-promise2').textContent = `“${promise2}”`;
        document.getElementById('cert-date').textContent = commitDate;

        // Hide form and show certificate
        document.getElementById('step-4').classList.remove('active');
        document.getElementById('certificate-container').classList.add('active');
    };

    if(generateBtn) {
        generateBtn.addEventListener('click', generateCertificate);
    }

    // --- PRINT FUNCTIONALITY ---
    if(printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Show initial step
    showStep(currentStep);
});
