document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.nom || !data.email || !data.message) {
                showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            showMessage('Envoi en cours...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                // In a real application, you would send this data to your server
                console.log('Form data:', data);
                
                // Show success message
                showMessage('Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.', 'success');
                
                // Reset form
                contactForm.reset();
            }, 1500);
        });
    }
    
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 15px;
            margin-top: 20px;
            border-radius: 10px;
            text-align: center;
            font-weight: 500;
            ${type === 'success' ? 'background: rgba(0, 255, 0, 0.1); color: #00ff00; border: 1px solid #00ff00;' : ''}
            ${type === 'error' ? 'background: rgba(255, 0, 0, 0.1); color: #ff0000; border: 1px solid #ff0000;' : ''}
            ${type === 'info' ? 'background: rgba(0, 212, 255, 0.1); color: #00D4FF; border: 1px solid #00D4FF;' : ''}
        `;
        
        // Insert message
        const form = document.getElementById('contactForm');
        if (form) {
            form.appendChild(messageDiv);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }
});
