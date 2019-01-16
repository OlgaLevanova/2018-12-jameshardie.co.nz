const ContactForm = {
    bindEvents: () => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            ContactForm.init(contactForm);
        }
    },

    init: (form) => {
        form.addEventListener('submit', (e) => {
            // validate form
            let formSuccess = true;
            let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            let submitButton = form.getElementsByClassName('sib-contact__submit')[0];
            let requiredFields = form.getElementsByClassName('required');
            ContactForm.clearErrors(form);
            submitButton.getElementsByTagName('button')[0].disabled = true;
            for (let i = 0; i < requiredFields.length; i++) {
                let field = requiredFields[i];
                let hasError = false;
                if (field.classList.contains('required-email') && !emailReg.test(field.value)) {
                    hasError = true;
                } else if (field.classList.contains('required-recaptcha')) {
                    if (grecaptcha && grecaptcha.getResponse() === '') {
                        hasError = true;
                    }
                } else if (field.value === '') {
                    hasError = true;
                }
                if (hasError) {
                    field.parentElement.classList.add('sib-form-error');
                }
                formSuccess = formSuccess ? !hasError : formSuccess;
            }

            // if validation fails
            if (!formSuccess) {
                e.preventDefault();
                let firstError = form.getElementsByClassName('sib-form-error')[0];
                if (firstError) {
                    firstError.getElementsByClassName('required')[0].focus();
                }
                submitButton.getElementsByTagName('button')[0].disabled = false;
            }
        });
    },

    clearErrors: (form) => {
        let errorFields = form.getElementsByClassName('sib-form-group');
        for (let i = 0; i < errorFields.length; i++) {
            errorFields[i].classList.remove('sib-form-error');
        }
    },
};

module.exports = ContactForm;
