document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const countriesContainer = document.getElementById('countries-container');
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region-filter');

    // Fetch countries data from local JSON file
    const fetchCountries = async () => {
        try {
            const response = await fetch('data.json');
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    // Display countries
    const displayCountries = (countries) => {
        countriesContainer.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');
            countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="Flag of ${country.name}">
        <h2>${country.name}</h2>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
        <p>Capital: ${country.capital}</p>
      `;
            countryCard.addEventListener('click', () => {
                window.location.href = `country.html?name=${country.name}`;
            });
            countriesContainer.appendChild(countryCard);
        });
    };

    // Search countries
    const searchCountries = async () => {
        const searchValue = searchInput.value.toLowerCase();
        const regionValue = regionFilter.value;
        let apiUrl = 'data.json';

        try {
            const response = await fetch(apiUrl);
            let countries = await response.json();

            if (regionValue !== 'all') {
                countries = countries.filter(country => country.region === regionValue);
            }

            if (searchValue) {
                countries = countries.filter(country =>
                    country.name.toLowerCase().includes(searchValue)
                );
            }

            displayCountries(countries);
        } catch (error) {
            console.error('Error searching countries:', error);
        }
    };

    // Theme toggle
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.dataset.theme;
        document.body.dataset.theme = currentTheme === 'dark' ? 'light' : 'dark';
    });

    // Event listeners
    searchInput.addEventListener('input', searchCountries);
    regionFilter.addEventListener('change', searchCountries);

    // Initial fetch
    document.body.dataset.theme = 'dark';
    fetchCountries();
});
