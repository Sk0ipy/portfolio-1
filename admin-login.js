// Admin panel login functionality
document.addEventListener('DOMContentLoaded', () => {
    // Function to automatically set the next day number and date
    async function setNextDayAndDate() {
        try {
            // Import Firebase functions
            const { loadBlogsFromFirebase } = await import('./firebase-blog.js');
            
            // Get saved days from Firebase
            const days = await loadBlogsFromFirebase();
            let nextDayNumber = 1;
            
            if (Object.keys(days).length > 0) {
                // Find the maximum day number and add 1
                const dayNumbers = Object.keys(days).map(day => parseInt(day));
                nextDayNumber = Math.max(...dayNumbers) + 1;
            }
            
            // Set the value in the form
            const dayNumberInput = document.getElementById('day-number');
            if (dayNumberInput) {
                dayNumberInput.value = nextDayNumber;
            }
            
            // Also set today's date as default
            const today = new Date();
            const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
            const dateString = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
            
            const dayDateInput = document.getElementById('day-date');
            if (dayDateInput) {
                dayDateInput.value = dateString;
            }
        } catch (error) {
            console.error('Error setting next day number and date:', error);
        }
    }
    // Get elements
    const adminButton = document.getElementById('admin-button');
    const adminPanel = document.getElementById('admin-panel');
    const passwordForm = document.getElementById('password-form');
    const dayCreator = document.getElementById('day-creator');
    const adminPassword = document.getElementById('admin-password');
    const passwordSubmit = document.getElementById('password-submit');
    const closeAdminPanel = document.getElementById('close-admin-panel');
    
    // Password hash for "test" (for demo purposes)
    const correctPasswordHash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
    
    // Open admin panel
    if (adminButton) {
        adminButton.addEventListener('click', function() {
            adminPanel.classList.remove('hidden');
            adminPassword.focus();
        });
    }
    
    // Close admin panel
    if (closeAdminPanel) {
        closeAdminPanel.addEventListener('click', function() {
            adminPanel.classList.add('hidden');
            // Reset the form
            passwordForm.classList.remove('hidden');
            dayCreator.classList.add('hidden');
            adminPassword.value = '';
        });
    }
    
    // Close panel when clicking outside
    if (adminPanel) {
        adminPanel.addEventListener('click', function(e) {
            if (e.target === adminPanel) {
                adminPanel.classList.add('hidden');
                // Reset the form
                passwordForm.classList.remove('hidden');
                dayCreator.classList.add('hidden');
                adminPassword.value = '';
            }
        });
    }
    
    // SHA-256 hashing function
    async function sha256(message) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(message);
        // hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        // convert bytes to hex string
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
    
    // Password verification function
    async function checkPassword() {
        try {
            // Hash the entered password
            const enteredPasswordHash = await sha256(adminPassword.value);
            
            // Compare with the stored hash
            if (enteredPasswordHash === correctPasswordHash) {
                // Show day creator form if password is correct
                passwordForm.classList.add('hidden');
                dayCreator.classList.remove('hidden');
                
                // Set next day number and date automatically
                await setNextDayAndDate();
                
                // Set focus to the day label field since day number is auto-populated
                const dayLabelField = document.getElementById('day-label');
                if (dayLabelField) {
                    dayLabelField.focus();
                }
            } else {
                // Show error if password is wrong
                adminPassword.style.borderColor = 'red';
                setTimeout(() => {
                    adminPassword.style.borderColor = '';
                }, 1500);
            }
        } catch (error) {
            console.error('Error checking password:', error);
        }
    }
    
    // Handle password form submission
    if (passwordSubmit) {
        passwordSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            checkPassword();
        });
    }
    
    // Also check password when pressing Enter
    if (adminPassword) {
        adminPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                checkPassword();
            }
        });
    }
    
    // Connect empty state admin button to open admin panel
    const emptyStateAdminButton = document.getElementById('empty-state-admin-button');
    if (emptyStateAdminButton) {
        emptyStateAdminButton.addEventListener('click', function() {
            adminPanel.classList.remove('hidden');
            adminPassword.focus();
        });
    }
});
