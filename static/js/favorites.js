
document.addEventListener('DOMContentLoaded', function() {
    // Initialize favorites from localStorage
    let favorites = [];
    try {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            favorites = JSON.parse(storedFavorites);
        }
    } catch (e) {
        console.error('Error loading favorites:', e);
    }

    // Function to toggle favorite status
    function toggleFavorite(id) {
        const index = favorites.findIndex(item => item.id === id);
        
        if (index === -1) {
            // Get item data from the page or API
            fetch(`/directory/${id}`)
                .then(response => response.text())
                .then(html => {
                    // Create a temporary DOM element to parse HTML
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    
                    // Extract item info from the HTML
                    const name = doc.querySelector('h1').textContent;
                    const description = doc.querySelector('p.text-gray-700').textContent;
                    const imageUrl = doc.querySelector('img').src;
                    const category = doc.querySelector('span.text-gray-600').textContent.replace('Category: ', '');
                    const rating = parseFloat(doc.querySelector('span.text-yellow-500.font-semibold').textContent);
                    
                    // Add to favorites
                    const newItem = {
                        id,
                        name,
                        description,
                        imageUrl,
                        category,
                        rating
                    };
                    favorites.push(newItem);
                    saveAndUpdateFavorites();
                })
                .catch(error => {
                    console.error('Error adding favorite:', error);
                });
        } else {
            // Remove from favorites
            favorites.splice(index, 1);
            saveAndUpdateFavorites();
        }
    }

    // Save favorites to localStorage and update UI
    function saveAndUpdateFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Update favorite buttons appearance
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const id = btn.dataset.id;
            const isFavorite = favorites.some(item => item.id === id);
            
            if (isFavorite) {
                btn.classList.add('text-yellow-500');
                btn.classList.remove('text-gray-400');
            } else {
                btn.classList.add('text-gray-400');
                btn.classList.remove('text-yellow-500');
            }
        });
        
        // Send to server API
        fetch('/api/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ favorites: favorites }),
        });
    }

    // Add click event listeners to favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const id = btn.dataset.id;
        const isFavorite = favorites.some(item => item.id === id);
        
        // Set initial state
        if (isFavorite) {
            btn.classList.add('text-yellow-500');
            btn.classList.remove('text-gray-400');
        }
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFavorite(id);
        });
    });
});
