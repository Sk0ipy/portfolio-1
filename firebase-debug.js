// Firebase Debug Helper
console.log('Firebase debug helper loaded');

// Function to debug Firebase data loading
async function debugFirebaseLoading() {
    try {
        // Import Firebase functions directly
        const { loadBlogsFromFirebase } = await import('./firebase-blog.js');
        
        console.log('Attempting to load blogs from Firebase...');
        const days = await loadBlogsFromFirebase();
        
        console.log('Firebase blogs data:', days);
        console.log('Number of blog posts:', Object.keys(days).length);
        
        return days;
    } catch (error) {
        console.error('Error in Firebase debug:', error);
        return null;
    }
}

// Function to fix blog loading on page refresh
async function fixBlogRefresh() {
    console.log('Running blog refresh fix...');
    
    try {
        // Import Firebase modules directly
        const { loadBlogsFromFirebase } = await import('./firebase-blog.js');
        
        // Get blog data
        const days = await loadBlogsFromFirebase();
        console.log('Loaded days:', days);
        
        if (!days || Object.keys(days).length === 0) {
            console.log('No blog posts found in Firebase');
            return;
        }
        
        // Get the calendar grid
        const calendarGrid = document.getElementById('calendar-grid');
        if (!calendarGrid) {
            console.error('Calendar grid element not found');
            return;
        }
        
        // Clear existing days
        calendarGrid.innerHTML = '';
        
        // Sort the days by number
        const sortedDayNumbers = Object.keys(days).sort((a, b) => parseInt(a) - parseInt(b));
        
        console.log('Rendering blog posts:', sortedDayNumbers);
        
        // Create elements for each day
        sortedDayNumbers.forEach(dayNumber => {
            const day = days[dayNumber];
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.setAttribute('data-day', dayNumber);
            dayElement.setAttribute('data-id', day.id);
            
            dayElement.innerHTML = `
                <span class="day-number">Day ${dayNumber}</span>
                <span class="day-label">${day.label}</span>
            `;
            
            calendarGrid.appendChild(dayElement);
            
            // Add click event
            dayElement.addEventListener('click', () => {
                // Find and call the global showDayContent function
                if (typeof window.showDayContent === 'function') {
                    window.showDayContent(dayNumber);
                } else {
                    console.error('showDayContent function not found');
                }
            });
        });
        
        // Check empty state
        const emptyState = document.getElementById('empty-calendar-state');
        if (emptyState) {
            emptyState.style.display = 'none';
        }
        if (calendarGrid) {
            calendarGrid.style.display = 'grid';
        }
        
        console.log('Blog refresh fix completed successfully');
    } catch (error) {
        console.error('Error in blog refresh fix:', error);
    }
}

// Make functions available globally
window.debugFirebaseLoading = debugFirebaseLoading;
window.fixBlogRefresh = fixBlogRefresh;

// Function to show loading state instead of empty state
function showLoadingState() {
    const emptyState = document.getElementById('empty-calendar-state');
    const calendarGrid = document.getElementById('calendar-grid');
    
    // Only modify if found
    if (emptyState) {
        // Save original content
        if (!emptyState.hasAttribute('data-original')) {
            emptyState.setAttribute('data-original', emptyState.innerHTML);
        }
        
        // Show loading spinner instead of empty state
        emptyState.innerHTML = `
            <div class="empty-state-icon">
                <div class="spinner-animation"></div>
            </div>
            <h3 class="loading-title">Loading Blog Posts...</h3>
            <p class="loading-message">Just a moment while we load your content.</p>
        `;
        
        // Make sure it's visible
        emptyState.style.display = 'block';
        if (calendarGrid) calendarGrid.style.display = 'none';
    }
}

// Function to restore original empty state if needed
function restoreEmptyState() {
    const emptyState = document.getElementById('empty-calendar-state');
    
    if (emptyState && emptyState.hasAttribute('data-original')) {
        emptyState.innerHTML = emptyState.getAttribute('data-original');
    }
}

// Run the fix automatically with minimal delay and proper loading state
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, showing loading state...');
    showLoadingState();
    
    // Set a longer delay (1500ms) to showcase the loading spinner
    setTimeout(fixBlogRefresh, 1500);
});

// Export for module usage
export {
    debugFirebaseLoading,
    fixBlogRefresh
};
