// contacts-script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) {
      console.error('Form not found');
      return;
    }
  
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission
  
      // Check if emailConfig is loaded
      if (typeof emailConfig === 'undefined') {
        console.error('emailConfig not defined. Ensure config.js is loaded.');
        alert('Configuration error. Please try again later.');
        return;
      }
  
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
  
      // EmailJS parameters using config.js
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message
      };
  
      // Send email using EmailJS
      emailjs.send(emailConfig.serviceID, emailConfig.templateID, templateParams)
        .then((response) => {
          console.log('Email sent successfully!', response.status, response.text);
  
          // Trigger animation
          const submitBtn = document.querySelector('sbt-btn');
          submitBtn.classList.add('clicked');
  
          // Show success message
          const successMessage = document.getElementById('success-message');
          successMessage.classList.add('show');
  
          // Reset form and animation after 2 seconds
          setTimeout(() => {
            submitBtn.classList.remove('clicked');
            successMessage.classList.remove('show');
            form.reset(); // Clear form fields
          }, 2000);
        }, (error) => {
          console.error('Failed to send email:', error);
          alert('Oops! Something went wrong. Please try again later.');
        });
    });
  });