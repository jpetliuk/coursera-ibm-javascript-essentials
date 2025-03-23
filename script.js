// Mock JSON data (normally would be fetched from an API)
const travelData = {
   recommendations: [
      {
         id: 1,
         name: "Bali Beach",
         type: "beach",
         location: "Bali, Indonesia",
         description:
            "Pristine white sands and crystal-clear waters make Bali's beaches a paradise for sun lovers and surfers alike. Enjoy breathtaking sunsets, water sports, and beachside dining.",
         imageUrl: "/api/placeholder/600/400",
         timeZone: "Asia/Makassar",
      },
      {
         id: 2,
         name: "Maldives Beach Resorts",
         type: "beach",
         location: "Maldives",
         description:
            "Experience luxury overwater bungalows and private beaches with the softest sand and most vibrant blue waters you've ever seen. Perfect for honeymoons and special occasions.",
         imageUrl: "/api/placeholder/600/400",
         timeZone: "Indian/Maldives",
      },
      {
         id: 3,
         name: "Angkor Wat",
         type: "temple",
         location: "Siem Reap, Cambodia",
         description:
            "The largest religious monument in the world, Angkor Wat is a stunning example of Khmer architecture. Explore the vast temple complex with its intricate stone carvings and ancient history.",
         imageUrl: "/api/placeholder/600/400",
         timeZone: "Asia/Phnom_Penh",
      },
      {
         id: 4,
         name: "Golden Temple",
         type: "temple",
         location: "Amritsar, India",
         description:
            "The holiest gurdwara of Sikhism, the Golden Temple is a stunning structure surrounded by a sacred pool. Visitors of all faiths are welcome to experience its peaceful atmosphere and community kitchen.",
         imageUrl: "/api/placeholder/600/400",
         timeZone: "Asia/Kolkata",
      },
      {
         id: 5,
         name: "Japan",
         type: "country",
         location: "East Asia",
         description:
            "Experience the perfect blend of ancient traditions and cutting-edge technology. From cherry blossoms and historic temples to bustling modern cities, Japan offers unforgettable cultural experiences.",
         imageUrl: "/api/placeholder/600/400",
         timeZone: "Asia/Tokyo",
      },
      {
         id: 6,
         name: "New Zealand",
         type: "country",
         location: "Oceania",
         description:
            "A land of breathtaking landscapes, from fjords and mountains to beaches and forests. Perfect for adventure seekers, nature lovers, and Lord of the Rings fans alike.",
         imageUrl: "/api/placeholder/600/400",
         timeZone: "Pacific/Auckland",
      },
   ],
};

// DOM Elements - check if they exist on current page
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const recommendationsSection = document.getElementById(
   "recommendationsSection"
);
const resultsContainer = document.getElementById("resultsContainer");
const loadingIndicator = document.getElementById("loadingIndicator");
const contactForm = document.getElementById("contactForm");

// Setup search functionality if elements exist (Home page)
if (searchBtn && searchInput && resetBtn) {
   // Search button click event
   searchBtn.addEventListener("click", function () {
      const searchTerm = searchInput.value.toLowerCase().trim();
      if (searchTerm) {
         searchRecommendations(searchTerm);
      }
   });

   // Reset button click event
   resetBtn.addEventListener("click", function () {
      searchInput.value = "";
      if (recommendationsSection) {
         recommendationsSection.classList.add("hidden");
      }
      if (resultsContainer) {
         resultsContainer.innerHTML = "";
      }
   });

   // Enter key in search input
   searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
         const searchTerm = searchInput.value.toLowerCase().trim();
         if (searchTerm) {
            searchRecommendations(searchTerm);
         }
      }
   });
}

// Contact form submission if it exists (Contact page)
if (contactForm) {
   contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
   });
}

/**
 * Function to search recommendations
 * @param {string} term - The search term
 */
function searchRecommendations(term) {
   // Only proceed if we're on the home page with these elements
   if (!recommendationsSection || !loadingIndicator || !resultsContainer) {
      return;
   }

   // Show loading indicator
   recommendationsSection.classList.remove("hidden");
   loadingIndicator.classList.remove("hidden");
   resultsContainer.innerHTML = "";

   // Simulate API fetch delay
   setTimeout(() => {
      // Filter recommendations based on search term
      const results = travelData.recommendations.filter((item) => {
         // Check if term contains beach/beaches (any case)
         if (/beach(es)?/i.test(term) && item.type === "beach") {
            return true;
         }

         // Check if term contains temple/temples (any case)
         if (/temple(s)?/i.test(term) && item.type === "temple") {
            return true;
         }

         // Check if term contains country/countries (any case)
         if (/countr(y|ies)/i.test(term) && item.type === "country") {
            return true;
         }

         // Also check for direct matches in name, location, or description
         return (
            item.type.toLowerCase().includes(term) ||
            item.name.toLowerCase().includes(term) ||
            item.location.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
         );
      });

      // Hide loading indicator
      loadingIndicator.classList.add("hidden");

      // Display results or no results message
      if (results.length > 0) {
         displayResults(results);
      } else {
         resultsContainer.innerHTML = `<p style="text-align: center; width: 100%;">No recommendations found for "${term}". Try another search term.</p>`;
      }
   }, 1000); // Simulate 1 second delay
}

/**
 * Function to display search results
 * @param {Array} results - Array of result objects
 */
function displayResults(results) {
   if (!resultsContainer) return;

   results.forEach((item) => {
      const currentTime = getLocationTime(item.timeZone);

      const card = document.createElement("div");
      card.className = "recommendation-card";
      card.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.name}">
          <div class="card-content">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <div class="location-time">
                  <div class="location">
                      <span>📍</span> ${item.location}
                  </div>
                  <div class="time">
                      <span>🕒</span> ${currentTime}
                  </div>
              </div>
          </div>
      `;

      resultsContainer.appendChild(card);
   });
}

/**
 * Function to get current time based on timezone
 * @param {string} timeZone - The timezone name
 * @returns {string} - Formatted time string
 */
function getLocationTime(timeZone) {
   try {
      const options = {
         timeZone: timeZone,
         hour12: true,
         hour: "numeric",
         minute: "numeric",
      };
      return new Date().toLocaleTimeString("en-US", options);
   } catch (error) {
      return "Time unavailable";
   }
}

/**
 * Function to fetch data from API (simulation)
 * In a real application, this would fetch the JSON from a server
 */
function fetchTravelData() {
   // This would typically be:
   // return fetch('travel_recommendation_api.json')
   //     .then(response => response.json())
   //     .then(data => {
   //         console.log('Fetched data:', data);
   //         return data;
   //     })
   //     .catch(error => {
   //         console.error('Error fetching data:', error);
   //         return null;
   //     });

   // For now, we'll just return our mock data with a Promise
   return new Promise((resolve) => {
      setTimeout(() => {
         console.log("Fetched data:", travelData);
         resolve(travelData);
      }, 300);
   });
}

// Initialize data on page load
document.addEventListener("DOMContentLoaded", () => {
   // Simulate fetching data from API
   fetchTravelData();
});
