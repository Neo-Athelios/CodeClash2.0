// --- MAIN SCRIPT ---
    document.addEventListener("DOMContentLoaded", function () {
  // --- GLOBAL CONSTANTS ---
  const ITEMS_PER_PAGE = 15;
  let currentPage = 1;

  // --- DOM ELEMENTS ---
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  const quoteTextElement = document.getElementById("quoteText");
  const searchInput = document.getElementById("mainSearch");
  const resultsContainer = document.getElementById("search-results-container");
  const filterControls = document.querySelectorAll('.filters-section input');
  const sortBySelect = document.getElementById('sort-by');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');
  const dishTypeFiltersContainer = document.getElementById('dish-type-filters');
  const activeFiltersSummary = document.getElementById('active-filters-summary');
  const paginationControls = document.getElementById('pagination-controls');
  // Removed: const popularDishesGrid = document.getElementById('popular-dishes-grid');
  const allDishesList = document.getElementById('all-dishes-list'); // All dishes list element


  // --- DATA ---
  let foodDatabase = [];
  let processedFoodData = [];
  let currentFilteredFoods = [];

  // --- MOBILE MENU ---
  if (mobileMenuBtn && navLinks) { // Added null checks for robustness
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // --- HEALTHY QUOTES ROTATOR ---
  const quotes = [
    '"To eat is a necessity, but to eat intelligently is an art."',
    "Fact: A rainbow on your plate means a variety of nutrients.",
    '"Your body is a temple, but only if you treat it as one."',
    "Fact: Staying hydrated can improve energy levels and brain function.",
    '"Let food be thy medicine and medicine be thy food."',
    "Fact: Healthy fats from avocados and nuts are vital for your health.",
    '"A healthy outside starts from the inside."',
  ];
  let quoteIndex = 0;
  function changeQuote() {
    if (quoteTextElement) { // Added null check
      quoteTextElement.classList.add("animate__animated", "animate__fadeOut");
      setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteTextElement.textContent = quotes[quoteIndex];
        quoteTextElement.classList.remove("animate__fadeOut");
        quoteTextElement.classList.add("animate__animated", "animate__fadeIn");
      }, 500);
    }
  }
  if (quoteTextElement) {
    quoteTextElement.textContent = quotes[quoteIndex];
    quoteTextElement.classList.add("animate__animated", "animate__fadeIn");
    setInterval(changeQuote, 5000);
  }

  // --- COLLAPSIBLE FILTER GROUPS ---
  document.querySelectorAll('.filter-group h3').forEach(header => {
      header.addEventListener('click', function() {
          const options = this.nextElementSibling;
          options.classList.toggle('hidden');
          this.classList.toggle('collapsed');
      });
  });

  // --- FOOD DATA LOADING & CATEGORIZATION ---
  async function loadFoodData() {
    // Only show loading spinner in resultsContainer if it's visible or a search is imminent
    // For now, let's keep it for initial load feedback
    if (resultsContainer) {
        resultsContainer.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading food data...</div>';
    }
    
    try {
      const response = await fetch("foods.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      foodDatabase = await response.json();
      
      // Infer dish types and add `healthy` flags
      processedFoodData = foodDatabase.map(food => {
        const dishName = food["Dish Name"].toLowerCase();
        let dishType = "Other";

        if (dishName.includes("tea") || dishName.includes("coffee") || dishName.includes("drink") || dishName.includes("juice") || dishName.includes("lassi") || dishName.includes("sherbet")) {
          dishType = "Beverage";
        } else if (dishName.includes("roti") || dishName.includes("paratha") || dishName.includes("idli") || dishName.includes("dosa") || dishName.includes("poha") || dishName.includes("upma") || dishName.includes("puri") || dishName.includes("bread")) {
          dishType = "Breakfast";
        } else if (dishName.includes("dal") || dishName.includes("curry") || dishName.includes("sabzi") || dishName.includes("rice") || dishName.includes("biryani") || dishName.includes("thali") || dishName.includes("kofta") || dishName.includes("paneer") || dishName.includes("chicken") || dishName.includes("fish")) {
          dishType = "Main Course";
        } else if (dishName.includes("chutney") || dishName.includes("pickle") || dishName.includes("raita") || dishName.includes("salad") || dishName.includes("papad")) {
          dishType = "Side Dish";
        } else if (dishName.includes("samosa") || dishName.includes("pakora") || dishName.includes("sandwich") || dishName.includes("chaat") || dishName.includes("vada") || dishName.includes("bhel") || dishName.includes("kachori")) {
          dishType = "Snack";
        } else if (dishName.includes("barfi") || dishName.includes("ladoo") || dishName.includes("halwa") || dishName.includes("gulab jamun") || dishName.includes("rasgulla") || dishName.includes("kheer") || dishName.includes("jalebi")) {
          dishType = "Dessert";
        }

        // Add healthy flags based on thresholds (illustrative)
        const calories = parseFloat(food["Calories (kcal)"]);
        const protein = parseFloat(food["Protein (g)"]);
        const fats = parseFloat(food["Fats (g)"]);
        const fibre = parseFloat(food["Fibre (g)"]);
        const freeSugar = parseFloat(food["Free Sugar (g)"]);
        const calcium = food["Calcium (mg)"] !== "" ? parseFloat(food["Calcium (mg)"]) : 0;
        const iron = food["Iron (mg)"] !== "" ? parseFloat(food["Iron (mg)"]) : 0;
        const vitaminC = food["Vitamin C (mg)"] !== "" ? parseFloat(food["Vitamin C (mg)"]) : 0;
        const folate = food["Folate (µg)"] !== "" ? parseFloat(food["Folate (µg)"]) : 0;


        return {
          ...food,
          dishType: dishType,
          isLowCalorie: calories < 200,
          isModerateCalorie: calories >= 200 && calories <= 500,
          isHighCalorie: calories > 500,
          isHighProtein: protein >= 15,
          isLowFat: fats <= 5,
          isHighFibre: fibre >= 3,
          isLowSugar: freeSugar <= 5,
          isHighCalcium: calcium >= 100,
          isHighIron: iron >= 2,
          isHighVitaminC: vitaminC >= 15,
          isHighFolate: folate >= 80,
        };
      });

      populateDishTypeFilters();
      
      // Removed: populatePopularDishes() as per user request

      // Ensure allDishesList exists before attempting to populate
      if (allDishesList) {
        populateAllDishesList();
      } else {
        console.warn("Element with ID 'all-dishes-list' not found. All dishes section may not display.");
      }
      
      displayResults();

    } catch (error) {
      console.error("Could not load food database:", error);
      if (resultsContainer) {
        resultsContainer.innerHTML = `<div class="no-results">Could not load food data. Please ensure 'foods.json' is available and try again. If running locally, use a local server (e.g., Live Server).</div>`;
      }
    }
  }

  function populateDishTypeFilters() {
    const dishTypes = [...new Set(processedFoodData.map(food => food.dishType))].sort();
    if (dishTypeFiltersContainer) { // Ensure the container exists
        dishTypeFiltersContainer.innerHTML = '';
        dishTypes.forEach(type => {
          const button = document.createElement('button');
          button.className = 'btn';
          button.textContent = type;
          button.setAttribute('data-dish-type', type);
          button.addEventListener('click', function() {
            this.classList.toggle('active');
            currentPage = 1;
            displayResults();
          });
          dishTypeFiltersContainer.appendChild(button);
        });
    }
  }

  // Removed: populatePopularDishes function


  // --- NEW: POPULATE ALL DISHES LIST ---
  function populateAllDishesList() {
    if (allDishesList) { // Added null check here
        allDishesList.innerHTML = ''; // Clear previous content
        // Filter out generic items or non-distinctly Indian items if necessary, or include all
        const indianDishes = processedFoodData.filter(food => {
            // Simple check for now, can be expanded for more precise filtering
            const dishNameLower = food["Dish Name"].toLowerCase();
            return !dishNameLower.includes("instant coffee") &&
                   !dishNameLower.includes("espreso coffee") &&
                   !dishNameLower.includes("sandwich") && // Exclude generic sandwiches
                   !dishNameLower.includes("plain paratha") && // Exclude if specific parathas are listed
                   !dishNameLower.includes("plain roti"); // Exclude if specific rotis are listed
            // You can add more specific rules here if needed to filter what appears in 'all dishes'
        }).sort((a, b) => a["Dish Name"].localeCompare(b["Dish Name"])); // Sort alphabetically

        indianDishes.forEach(food => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <span class="all-dish-name">${food["Dish Name"]}</span>
            <span class="all-dish-calories">${food["Calories (kcal)"] ? `${food["Calories (kcal)"]} kcal` : 'N/A kcal'}</span>
          `;
          listItem.addEventListener('click', () => {
            searchInput.value = food["Dish Name"];
            // Clear existing filters for a clean search
            if (document.querySelector('input[name="calories"][value="all"]')) {
                document.querySelector('input[name="calories"][value="all"]').checked = true;
            }
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
            document.querySelectorAll('#dish-type-filters .btn.active').forEach(button => button.classList.remove('active'));
            if (sortBySelect) {
                sortBySelect.value = 'default';
            }

            currentPage = 1; // Reset to first page
            displayResults(); // Trigger display results to show the specific item
            
            // Scroll to the search section
            const searchSection = document.getElementById('search');
            if (searchSection) {
                searchSection.scrollIntoView({ behavior: 'smooth' });
            }
          });
          allDishesList.appendChild(listItem);
        });
    }
  }

  // --- FILTERING LOGIC ---
  function applyFilters(foods) {
      const query = searchInput.value.toLowerCase().trim();
      
      return foods.filter(food => {
          // Search query match
          if (query && !food["Dish Name"].toLowerCase().includes(query)) {
              return false;
          }

          // Nutritional Filters
          const caloriesFilter = document.querySelector('input[name="calories"]:checked')?.value || 'all'; // Added optional chaining
          if (caloriesFilter === "low" && !food.isLowCalorie) return false;
          if (caloriesFilter === "moderate" && !food.isModerateCalorie) return false;
          if (caloriesFilter === "high" && !food.isHighCalorie) return false;

          if (document.querySelector('input[name="nutrient_focus"][value="high_protein"]')?.checked && !food.isHighProtein) return false;
          if (document.querySelector('input[name="nutrient_focus"][value="low_fat"]')?.checked && !food.isLowFat) return false;
          if (document.querySelector('input[name="nutrient_focus"][value="high_fibre"]')?.checked && !food.isHighFibre) return false;
          if (document.querySelector('input[name="nutrient_focus"][value="low_sugar"]')?.checked && !food.isLowSugar) return false;

          if (document.querySelector('input[name="micronutrient_focus"][value="high_calcium"]')?.checked && !food.isHighCalcium) return false;
          if (document.querySelector('input[name="micronutrient_focus"][value="high_iron"]')?.checked && !food.isHighIron) return false;
          if (document.querySelector('input[name="micronutrient_focus"][value="high_vitamin_c"]')?.checked && !food.isHighVitaminC) return false;
          if (document.querySelector('input[name="micronutrient_focus"][value="high_folate"]')?.checked && !food.isHighFolate) return false;

          // Dish Type Filters
          const activeDishTypeButtons = document.querySelectorAll('#dish-type-filters .btn.active');
          if (activeDishTypeButtons.length > 0) {
              const selectedDishTypes = Array.from(activeDishTypeButtons).map(btn => btn.dataset.dishType);
              if (!selectedDishTypes.includes(food.dishType)) {
                  return false;
              }
          }
          
          return true;
      });
  }

  // --- SORTING LOGIC ---
  function applySorting(foods) {
      const sortOrder = sortBySelect?.value || 'default'; // Added optional chaining
      foods.sort((a, b) => {
          switch (sortOrder) {
              case 'calories_asc': return parseFloat(a["Calories (kcal)"]) - parseFloat(b["Calories (kcal)"]);
              case 'calories_desc': return parseFloat(b["Calories (kcal)"]) - parseFloat(a["Calories (kcal)"]);
              case 'protein_desc': return parseFloat(b["Protein (g)"]) - parseFloat(a["Protein (g)"]);
              case 'fibre_desc': return parseFloat(b["Fibre (g)"]) - parseFloat(a["Fibre (g)"]);
              case 'alphabetical': return a["Dish Name"].localeCompare(b["Dish Name"]);
              default: return 0;
          }
      });
      return foods;
  }

  // --- MAIN DISPLAY FUNCTION ---
  function displayResults() {
    if (!resultsContainer) return; // Exit if results container is not found

    resultsContainer.innerHTML = "";
    const existingDetailTable = document.getElementById("detailed-info-table");
    if (existingDetailTable) {
      existingDetailTable.remove();
    }
    const existingTip = document.querySelector('.contextual-tip');
    if (existingTip) {
        existingTip.remove();
    }

    currentFilteredFoods = applyFilters(processedFoodData);
    currentFilteredFoods = applySorting(currentFilteredFoods);

    updateFilterSummary();

    if (currentFilteredFoods.length === 0) {
      resultsContainer.innerHTML = `<div class="no-results">No results found for your search and filter criteria. Try broadening your search or <a href="#" id="clear-filters-link" style="color:var(--primary); text-decoration:underline;">clearing filters</a>.</div>`;
      // Add event listener to clear filters link
      const clearFiltersLink = document.getElementById('clear-filters-link');
      if (clearFiltersLink) {
        clearFiltersLink.addEventListener('click', function(e) {
          e.preventDefault();
          if (clearFiltersBtn) {
        clearFiltersBtn.click();
          }
        });
      }
      if (paginationControls) { // Added null check
          paginationControls.innerHTML = '';
      }
      return;
    }

    // Exact match logic - IMPORTANT: This needs to be checked against the *original* foodDatabase
    // to ensure a popular dish click or direct search displays the full info.
    const query = searchInput.value.toLowerCase().trim();
    const caloriesFilter = document.querySelector('input[name="calories"]:checked')?.value || 'all'; // Added optional chaining
    const otherFiltersApplied = areOtherFiltersApplied();
    
    // Find exact match in the *full* processedFoodData, not just the currently filtered set.
    const exactMatch = processedFoodData.find(food => food["Dish Name"].toLowerCase() === query);

    // Show detailed info if there's an exact match AND no other filters are active (or only default calorie filter)
    if (exactMatch && !otherFiltersApplied && caloriesFilter === 'all' && query) {
      showDetailedInfo(exactMatch);
      if (paginationControls) { // Added null check
          paginationControls.innerHTML = '';
      }
      return;
    }

    // --- Pagination logic ---
    const totalPages = Math.ceil(currentFilteredFoods.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedFoods = currentFilteredFoods.slice(startIndex, endIndex);

    paginatedFoods.forEach((food) => {
      const item = document.createElement("div");
      item.className = "search-result-item";
      
      // Add nutrient badges with Icons
      let badgesHtml = '';
      if (food.isLowCalorie) badgesHtml += `<span class="badge badge-low-calorie" title="Low Calorie"><i class="fas fa-leaf"></i></span>`; // Leaf for healthy/low
      if (food.isHighProtein) badgesHtml += `<span class="badge badge-high-protein" title="High Protein"><i class="fas fa-fish"></i></span>`; // Fish/meat for protein
      if (food.isHighFibre) badgesHtml += `<span class="badge badge-high-fibre" title="High Fibre"><i class="fas fa-wheat-awn"></i></span>`; // Wheat for fiber
      if (food.isLowSugar) badgesHtml += `<span class="badge badge-low-sugar" title="Low Sugar"><i class="fas fa-candy-cane" style="transform: rotate(45deg);"></i></span>`; // Candy cane with rotation for "no sugar" hint
      if (food.isHighCalcium) badgesHtml += `<span class="badge badge-high-nutrient" title="Rich in Calcium"><i class="fas fa-bone"></i></span>`; // Bone for calcium
      if (food.isHighIron) badgesHtml += `<span class="badge badge-high-nutrient" title="Rich in Iron"><i class="fas fa-tint"></i></span>`; // Drop for blood/iron
      if (food.isHighVitaminC) badgesHtml += `<span class="badge badge-high-nutrient" title="Rich in Vitamin C"><i class="fas fa-sun"></i></span>`; // Sun for Vitamin C
      if (food.isHighFolate) badgesHtml += `<span class="badge badge-high-nutrient" title="Rich in Folate"><i class="fas fa-dna"></i></span>`; // DNA for Folate/B-vitamins
      if (food.isHighCalorie) badgesHtml += `<span class="badge badge-high-calorie" title="High Calorie"><i class="fas fa-fire"></i></span>`; // Fire for high calorie

      item.innerHTML = `
        <span class="food-name">${food["Dish Name"]}</span>
        <span class="food-details">
          ${food["Calories (kcal)"] ? `<b>${food["Calories (kcal)"]}</b> kcal` : ""} 
          ${food["Protein (g)"] ? ` | <b>${food["Protein (g)"]}</b>g Protein` : ""}
          ${food.dishType ? ` | ${food.dishType}` : ""}
          ${badgesHtml}
        </span>
      `;
      item.style.cursor = "pointer";
      item.addEventListener("click", () => {
        searchInput.value = food["Dish Name"];
        if (resultsContainer) { // Added null check
            resultsContainer.innerHTML = "";
        }
        showDetailedInfo(food);
        if (paginationControls) { // Added null check
            paginationControls.innerHTML = '';
        }
      });
      resultsContainer.appendChild(item);
    });

    updatePaginationControls(totalPages);
  }

  // --- DETAILED INFO DISPLAY ---
  function showDetailedInfo(food) {
    if (!resultsContainer) return; // Exit if results container is not found

    const existingTable = document.getElementById("detailed-info-table");
    if (existingTable) {
      existingTable.remove();
    }
    const existingTip = document.querySelector('.contextual-tip');
    if (existingTip) {
        existingTip.remove();
    }

    const table = document.createElement("table");
    table.id = "detailed-info-table";
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.marginTop = "1rem";
    table.style.backgroundColor = "var(--white)";
    table.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.15)";
    table.style.borderRadius = "8px";
    table.style.overflow = "hidden";
    table.style.border = "3px solid var(--primary-dark)";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.textContent = "Nutrient";
    th1.style.borderBottom = "2px solid var(--light-gray)";
    th1.style.padding = "10px";
    th1.style.textAlign = "center";
    th1.style.fontWeight = "bold";
    const th2 = document.createElement("th");
    th2.textContent = "Value";
    th2.style.borderBottom = "2px solid var(--light-gray)";
    th2.style.padding = "10px";
    th2.style.textAlign = "center";
    th2.style.fontWeight = "bold";
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for (const key in food) {
      if (food.hasOwnProperty(key) && !['dishType', 'isLowCalorie', 'isModerateCalorie', 'isHighCalorie', 'isHighProtein', 'isLowFat', 'isHighFibre', 'isLowSugar', 'isHighCalcium', 'isHighIron', 'isHighVitaminC', 'isHighFolate'].includes(key)) {
        const match = key.match(/^(.+?)\s*\(([^)]+)\)$/m); // Changed to multiline match for safety
        let nutrient = key;
        let units = "";
        if (match) {
          nutrient = match[1].trim();
          units = match[2].trim();
        }

        const row = document.createElement("tr");
        const tdKey = document.createElement("td");
        tdKey.textContent = nutrient;
        tdKey.style.borderBottom = "1px solid var(--light-gray)";
        tdKey.style.padding = "8px";
        tdKey.style.textAlign = "center";
        tdKey.style.fontWeight = "bold";

        const tdValue = document.createElement("td");
        if (key.toLowerCase().includes("dish name")) {
          tdValue.innerHTML = `<b>${food[key]}</b>`;
        } else {
          tdValue.textContent = food[key] + (units ? " " + units : "");
        }
        tdValue.style.borderBottom = "1px solid var(--light-gray)";
        tdValue.style.padding = "8px";
        tdValue.style.textAlign = "center";
        row.appendChild(tdKey);
        row.appendChild(tdValue);
        tbody.appendChild(row);
      }
    }

    table.appendChild(tbody);
    // Ensure parentNode exists before appending
    if (resultsContainer.parentNode) {
        resultsContainer.parentNode.appendChild(table);
    }


    // Add Contextual Tips
    const tipsContainer = document.createElement('div');
    tipsContainer.className = 'contextual-tip';
    let tipsAdded = false;

    const calories = parseFloat(food["Calories (kcal)"]);
    const protein = parseFloat(food["Protein (g)"]);
    const fibre = parseFloat(food["Fibre (g)"]);
    const freeSugar = parseFloat(food["Free Sugar (g)"]);
    const iron = food["Iron (mg)"] !== "" ? parseFloat(food["Iron (mg)"]) : 0;
    const vitaminC = food["Vitamin C (mg)"] !== "" ? parseFloat(food["Vitamin C (mg)"]) : 0;

    if (calories > 400 && food.dishType !== "Main Course") {
        tipsContainer.innerHTML += '<p><i class="fas fa-lightbulb"></i> <strong>Tip:</strong> This is a calorie-dense item. Consider portion control or balancing it with lighter options in your meal.</p>';
        tipsAdded = true;
    }
    if (freeSugar > 10) { // Example for high sugar
        tipsContainer.innerHTML += '<p><i class="fas fa-lightbulb"></i> <strong>Tip:</strong> This item is relatively high in sugar. Enjoy in moderation or look for lower-sugar alternatives.</p>';
        tipsAdded = true;
    }
    if (protein < 5 && food.dishType !== "Beverage" && food.dishType !== "Side Dish") { // Low protein for non-beverage/side
        tipsContainer.innerHTML += '<p><i class="fas fa-lightbulb"></i> <strong>Tip:</strong> Boost your meal\'s protein by adding dal, paneer, or lean meat.</p>';
        tipsAdded = true;
    }
    if (fibre < 1 && food.dishType !== "Beverage") { // Low fiber for non-beverage
        tipsContainer.innerHTML += '<p><i class="fas fa-lightbulb"></i> <strong>Tip:</strong> Pair this with a high-fiber salad or vegetable side dish for a balanced meal.</p>';
        tipsAdded = true;
    }
    if (iron < 1 && food.dishType !== "Beverage") { // Example low iron
        tipsContainer.innerHTML += '<p><i class="fas fa-lightbulb"></i> <strong>Tip:</strong> Boost iron intake! Pair with Vitamin C rich foods (like citrus) to enhance absorption, or add dark leafy greens.</p>';
        tipsAdded = true;
    }
    if (vitaminC < 5 && food.dishType !== "Beverage") { // Example low Vitamin C
        tipsContainer.innerHTML += '<p><i class="fas fa-lightbulb"></i> <strong>Tip:</strong> To get more Vitamin C, include fresh fruits (like amla, orange) or bell peppers in your diet.</p>';
        tipsAdded = true;
    }


    if (tipsAdded) {
        if (resultsContainer.parentNode) { // Ensure parentNode exists
            resultsContainer.parentNode.appendChild(tipsContainer);
        }
    }
  }

  // --- FILTER SUMMARY ---
  function getActiveFiltersList() {
      const active = [];

      // Calories
      const caloriesFilter = document.querySelector('input[name="calories"]:checked')?.value || 'all'; // Added optional chaining
      if (caloriesFilter !== "all") {
          active.push({ name: document.querySelector(`input[name="calories"][value="${caloriesFilter}"]`).parentNode.textContent.trim(), type: 'calorie' });
      }

      // Macronutrients
      document.querySelectorAll('input[name="nutrient_focus"]:checked').forEach(checkbox => {
          active.push({ name: checkbox.parentNode.textContent.trim(), type: 'nutrient' });
      });

      // Micronutrients
      document.querySelectorAll('input[name="micronutrient_focus"]:checked').forEach(checkbox => {
          active.push({ name: checkbox.parentNode.textContent.trim(), type: 'micronutrient' });
      });

      // Dish Types
      document.querySelectorAll('#dish-type-filters .btn.active').forEach(button => {
          active.push({ name: button.textContent.trim(), type: 'dishType' });
      });

      // Search Query - MODIFIED TO INCLUDE TYPE for reliable clearing
      const query = searchInput.value.trim();
      if (query) {
          active.push({ name: `"${query}"`, type: 'query' }); // Store type as 'query'
      }
      return active;
  }

  function updateFilterSummary() {
      if (!activeFiltersSummary) return; // Exit if summary element not found

      activeFiltersSummary.innerHTML = '';
      const activeFilters = getActiveFiltersList();
      if (activeFilters.length > 0) {
          // Changed how data-filter-type is set for clarity and reliability
          const summaryHtml = `<strong>Active Filters:</strong> ${activeFilters.map(filter => `<span class="filter-tag">${filter.name} <i class="fas fa-times-circle" data-filter-name="${filter.name}" data-filter-type="${filter.type}"></i></span>`).join('')}`;
          activeFiltersSummary.innerHTML = summaryHtml;

          // Add event listeners to remove filter tags
          activeFiltersSummary.querySelectorAll('.filter-tag i').forEach(icon => {
              icon.addEventListener('click', function() {
                  const filterName = this.dataset.filterName;
                  const filterType = this.dataset.filterType; // Retrieve the new type
                  removeFilter(filterName, filterType); // Pass both name and type
                  currentPage = 1;
                  displayResults();
              });
          });
      }
  }

  function removeFilter(filterName, filterType) { // Modified to accept filterType for robust clearing
      if (filterType === 'calorie') {
          document.querySelector('input[name="calories"][value="all"]').checked = true;
      } else if (filterType === 'nutrient' || filterType === 'micronutrient') {
          // This logic works by matching the displayed text of the checkbox/button
          document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
              if (checkbox.parentNode.textContent.trim() === filterName) {
                  checkbox.checked = false;
              }
          });
      } else if (filterType === 'dishType') {
          document.querySelectorAll('#dish-type-filters .btn').forEach(button => {
              if (button.textContent.trim() === filterName) {
                  button.classList.remove('active');
              }
          });
      } else if (filterType === 'query') { // Now we check the explicit type 'query'
          searchInput.value = '';
      }
  }

  function areOtherFiltersApplied() {
    const nutrientFocusCheckboxes = document.querySelectorAll('input[name="nutrient_focus"]:checked');
    if (nutrientFocusCheckboxes.length > 0) return true;

    const micronutrientFocusCheckboxes = document.querySelectorAll('input[name="micronutrient_focus"]:checked');
    if (micronutrientFocusCheckboxes.length > 0) return true;

    const activeDishTypeButtons = document.querySelectorAll('#dish-type-filters .btn.active');
    if (activeDishTypeButtons.length > 0) return true;

    const query = searchInput.value.trim();
    if (query) return true;

    // Check if any calorie filter other than 'all' is selected
    const caloriesFilter = document.querySelector('input[name="calories"]:checked')?.value || 'all';
    if (caloriesFilter !== 'all') return true;

    return false;
  }

  // --- PAGINATION CONTROLS ---
  function updatePaginationControls(totalPages) {
      if (!paginationControls) return; // Exit if pagination controls not found

      paginationControls.innerHTML = '';
      if (totalPages <= 1) return;

      // Previous Button
      const prevButton = document.createElement('button');
      prevButton.textContent = 'Previous';
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener('click', () => {
          if (currentPage > 1) {
              currentPage--;
              displayResults();
          }
      });
      paginationControls.appendChild(prevButton);

      // Page Number Buttons
      const maxPageButtons = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
      let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

      if (endPage - startPage + 1 < maxPageButtons) {
          startPage = Math.max(1, endPage - maxPageButtons + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
          const pageButton = document.createElement('button');
          pageButton.textContent = i;
          if (i === currentPage) {
              pageButton.classList.add('active');
          }
          pageButton.addEventListener('click', () => {
              currentPage = i;
              displayResults();
          });
          paginationControls.appendChild(pageButton);
      }

      // Next Button
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next';
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener('click', () => {
          if (currentPage < totalPages) {
              currentPage++;
              displayResults();
          }
      });
      paginationControls.appendChild(nextButton);
  }

  // --- EVENT LISTENERS ---
  if (searchInput) { // Added null check
      searchInput.addEventListener("input", () => {
          currentPage = 1;
          displayResults();
      });
  }

  filterControls.forEach(control => {
    control.addEventListener('change', () => {
      currentPage = 1;
      displayResults();
    });
  });

  if (sortBySelect) { // Added null check
      sortBySelect.addEventListener('change', () => {
          currentPage = 1;
          displayResults();
      });
  }

  if (clearFiltersBtn) { // Added null check
      clearFiltersBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (document.querySelector('input[name="calories"][value="all"]')) {
            document.querySelector('input[name="calories"][value="all"]').checked = true;
        }
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.querySelectorAll('#dish-type-filters .btn.active').forEach(button => button.classList.remove('active'));
        if (sortBySelect) sortBySelect.value = 'default';
        currentPage = 1;
        displayResults();
      });
  }

  loadFoodData();
});

// Add new DOM element for local search
const allDishesLocalSearchInput = document.getElementById('all-dishes-local-search');
const groupedAllDishesList = document.getElementById('grouped-all-dishes-list'); // New container for grouped lists

// Modify populateAllDishesList to support grouping and local search
function populateAllDishesList(filterQuery = '') {
    if (!groupedAllDishesList) { // Use the new grouped container
        console.warn("Element with ID 'grouped-all-dishes-list' not found. All dishes section may not display correctly.");
        return;
    }
    groupedAllDishesList.innerHTML = ''; // Clear previous content

    // Filter dishes based on local search query if provided
    const dishesToDisplay = processedFoodData.filter(food => {
        const dishNameLower = food["Dish Name"].toLowerCase();
        // Exclude generic items as before
        if (dishNameLower.includes("instant coffee") || dishNameLower.includes("espreso coffee") || 
            dishNameLower.includes("sandwich") || dishNameLower.includes("plain paratha") || 
            dishNameLower.includes("plain roti")) {
            return false;
        }
        // Apply local search filter
        return dishNameLower.includes(filterQuery.toLowerCase());
    }).sort((a, b) => a["Dish Name"].localeCompare(b["Dish Name"]));

    // Group dishes by first letter
    const grouped = dishesToDisplay.reduce((acc, food) => {
        const firstLetter = food["Dish Name"].charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(food);
        return acc;
    }, {});

    const sortedLetters = Object.keys(grouped).sort();

    // Generate Alphabet Jump Links
    const alphabetJumpLinksContainer = document.querySelector('.alphabet-jump-links');
    if (alphabetJumpLinksContainer) {
        alphabetJumpLinksContainer.innerHTML = '';
        sortedLetters.forEach(letter => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.className = 'alphabet-jump-link';
            span.onclick = () => {
                const targetHeader = document.getElementById(`all-dishes-group-${letter}`);
                if (targetHeader) {
                    targetHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            };
            alphabetJumpLinksContainer.appendChild(span);
        });
    }


    sortedLetters.forEach(letter => {
        const groupHeader = document.createElement('h3');
        groupHeader.id = `all-dishes-group-${letter}`; // For jump links
        groupHeader.className = 'all-dishes-group-header collapsible-header'; // Add collapsible classes
        groupHeader.innerHTML = `${letter} <i class="fas fa-chevron-down"></i>`; // Add icon
        
        const groupList = document.createElement('ul');
        groupList.className = 'all-dishes-group-list collapsible-content'; // Add collapsible classes

        grouped[letter].forEach(food => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="all-dish-name">${food["Dish Name"]}</span>
                <span class="all-dish-calories">${food["Calories (kcal)"] ? `${food["Calories (kcal)"]} kcal` : 'N/A kcal'}</span>
            `;
            // Re-use existing click handler logic
            listItem.addEventListener('click', () => {
                searchInput.value = food["Dish Name"];
                // ... (your existing filter clearing logic) ...
                currentPage = 1;
                displayResults();
                const searchSection = document.getElementById('search');
                if (searchSection) {
                    searchSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
            groupList.appendChild(listItem);
        });

        groupedAllDishesList.appendChild(groupHeader);
        groupedAllDishesList.appendChild(groupList);
    });

    // Re-apply collapsible header logic for new headers
    document.querySelectorAll('.all-dishes-group-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('hidden'); // Assuming you have a .hidden class
            this.querySelector('i').classList.toggle('fa-chevron-down');
            this.querySelector('i').classList.toggle('fa-chevron-up');
        });
    });
}

// Add event listener for the new local search bar
if (allDishesLocalSearchInput) {
    allDishesLocalSearchInput.addEventListener('input', () => {
        populateAllDishesList(allDishesLocalSearchInput.value);
    });
}

// CodeClash JavaScript for Contact Form Submission
  // Show success message if redirected after submission
  document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash === '#contact-success') {
      var msg = document.getElementById('contact-success-message');
      if (msg) {
        msg.style.display = 'block';
        setTimeout(function() {
          msg.style.display = 'none';
          window.location.hash = '';
        }, 3500);
      }
    }
  });

  document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');

    // Disable button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json' // Essential for Formspree's JSON response
        }
      });

      if (response.ok) {
        // Form submission successful
        window.location.hash = '#contact-success';
        window.location.reload();
      } else {
        // Form submission failed (e.g., validation error, Formspree not activated)
        const data = await response.json();
        if (data.errors) {
          alert('Form submission failed: ' + data.errors.map(err => err.message).join(', '));
        } else {
          alert('Form submission failed. Please try again.');
        }
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    } catch (error) {
      // Network error or other unexpected issues
      console.error('Error submitting form:', error);
      alert('An error occurred. Please check your internet connection and try again.');
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });

const goToTopButton = document.getElementById('goToTop');
const scrollPercentage = document.getElementById('scrollPercentage');

// Show/hide "Go to Top" button and update scroll percentage
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        goToTopButton.style.display = 'flex';
    } else {
        goToTopButton.style.display = 'none';
    }

    // Update scroll percentage dynamically
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentageValue = (window.scrollY / scrollHeight) * 100;
    scrollPercentage.textContent = `${Math.round(scrollPercentageValue)}%`;
});

// Smooth scroll to top when "Go to Top" button is clicked
goToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll to sections with header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        const header = document.querySelector('header');
        const headerHeight = header.offsetHeight;
        
        window.scrollTo({
            top: target.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }
});
});

// Add scroll-margin-top to all sections
function setScrollMargin() {
const header = document.querySelector('header');
const headerHeight = header.offsetHeight;
document.querySelectorAll('section').forEach(section => {
    section.style.scrollMarginTop = `${headerHeight}px`;
});
}

// Set initial margin and update on resize
setScrollMargin();
window.addEventListener('resize', setScrollMargin);
