document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const backButton = document.getElementById('back-button');
    const countryDetails = document.getElementById('country-details');

    // Get country name from URL parameters
    const params = new URLSearchParams(window.location.search);
    const countryName = params.get('name');

    // Fetch country data from local JSON file
    const fetchCountry = async () => {
        try {
            const response = await fetch('data.json');
            const countries = await response.json();
            const country = countries.find(c => c.name === countryName);
            displayCountryDetails(country);
        } catch (error) {
            console.error('Error fetching country:', error);
        }
    };

    // Display country details
    const displayCountryDetails = async (country) => {
        const borderNames = await getBorderCountryNames(country.borders);
        countryDetails.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name}" width= "200px" height="250px">
      <h2>${country.name}</h2>
      <p><strong>Native Name:</strong> ${country.nativeName}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Subregion:</strong> ${country.subregion}</p>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <br/>
      <p><strong>Top Level Domain:</strong> ${country.topLevelDomain}</p>
      <p><strong>Currencies:</strong> ${Object.values(country.currencies).map(c => c.name).join(', ')}</p>
      <p><strong>Languages:</strong> ${Object.values(country?.languages).map(lg => lg.name).join(', ')}</p>

        <h3>Border Countries:</h3>
        <div class="border-countries">
            ${borderNames?.map(border => `<button class="border-country" onclick="location.href = 'country.html?name=${border}'">${border}</button>`).join('')}
        </div>
    `;
    };

    // Get border country names
    const getBorderCountryNames = async (borders) => {
        try {
            const response = await fetch('data.json');
            const countries = await response.json();
            return countries.filter(country => borders.includes(country.alpha3Code)).map(country => country.name);
        } catch (error) {
            console.error('Error fetching border countries:', error);
        }
    };

    // Back button
    backButton.addEventListener('click', () => {
        window.history.back();
    });

    // Theme toggle
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.dataset.theme;
        document.body.dataset.theme = currentTheme === 'dark' ? 'light' : 'dark';
    });

    // Initial fetch
    document.body.dataset.theme = 'dark';
    fetchCountry();
});
