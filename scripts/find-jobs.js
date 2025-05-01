// Search and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    const jobTypeSelect = document.getElementById('job-type');
    const locationSelect = document.getElementById('location');
    const categorySelect = document.getElementById('category');
    const jobCards = document.querySelectorAll('.job-card');
    const jobsGrid = document.querySelector('.jobs-grid');

    // Function to filter jobs
    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedJobType = jobTypeSelect.value.toLowerCase();
        const selectedLocation = locationSelect.value.toLowerCase();
        const selectedCategory = categorySelect.value.toLowerCase();

        let hasVisibleJobs = false;

        jobCards.forEach(card => {
            const jobTitle = card.querySelector('h3').textContent.toLowerCase();
            const company = card.querySelector('.company').textContent.toLowerCase();
            const location = card.querySelector('.location').textContent.toLowerCase();
            const type = card.querySelector('.type').textContent.toLowerCase();
            const category = card.dataset.category.toLowerCase();

            // Check if job matches all selected filters
            const matchesSearch = searchTerm === '' || 
                jobTitle.includes(searchTerm) || 
                company.includes(searchTerm);

            const matchesJobType = selectedJobType === '' || 
                type.includes(selectedJobType);

            const matchesLocation = selectedLocation === '' || 
                location.includes(selectedLocation);

            const matchesCategory = selectedCategory === '' || 
                category === selectedCategory;

            if (matchesSearch && matchesJobType && matchesLocation && matchesCategory) {
                card.style.display = 'flex';
                hasVisibleJobs = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        const noResultsMessage = document.querySelector('.no-results');
        if (!hasVisibleJobs) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = `
                    <h3>No jobs found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                `;
                jobsGrid.appendChild(message);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    // Event listeners for search and filters
    searchBtn.addEventListener('click', filterJobs);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterJobs();
        }
    });

    jobTypeSelect.addEventListener('change', filterJobs);
    locationSelect.addEventListener('change', filterJobs);
    categorySelect.addEventListener('change', filterJobs);

    // Initial filter on page load
    filterJobs();

    // Apply Button Animation
    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = `
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Applying...
            `;
            this.disabled = true;

            // Simulate API call
            setTimeout(() => {
                this.innerHTML = `
                    <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Applied
                `;
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }, 1500);
        });
    });
}); 