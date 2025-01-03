const logosInputItself = document.getElementById('logosInputItself');
const searchButton = document.getElementById('searchButton');
const errorParagraph = document.querySelector('.logos-input-paragraph');
const logosOutput = document.querySelector('.logos-output');
const logosOutputFavorites = document.querySelector('.logos-output-favorites');
const logoSearchData = [];
const logoSearchFavoriteData = [];
const logoIconData = [];
const logoNameData = [];
const logoDomainData = [];
let isFavoriteContainerActive = false;

// https://api.brandfetch.io/v2/search/${searchBar.value}?c=1idUXSK9JRPRbE6bhZn

// SEARCH FOR A LOGO

async function searchForLogo() {
    const searchInput = logosInputItself.value.toLowerCase();

    const response = await fetch(`https://api.brandfetch.io/v2/search/${searchInput}?c=1idUXSK9JRPRbE6bhZn`);
    const logoData = await response.json();

    let i = 0;
    while (i < logoData.length) {
        // CREATING AN ELEMENT
        const outputItself = document.createElement('div');
        outputItself.classList.add('logo-output');
        outputItself.innerHTML = `
            <div class="logo-output-image">
                    <img src="${logoData[i].icon}" class="logo-output-image-itself">
            </div>
            <div class="logo-output-info" style="flex-direction: ${logoData[i].name.length > 6 ? 'column' : 'row'}; align-items: ${logoData[i].name.length > 6 ? 'flex-start' : 'center'};">
                <h2 class="logo-output-info-name">${logoData[i].name}</h2>
                <a href="https://${logoData[i].domain}" target="_blank" class="logo-output-info-domain">${logoData[i].domain}</a>
            </div>
            <div class="logo-output-buttons">
                <button type="button" class="logo-output-button logo-output-copy-button" title="Copy icon URL">COPY ICON URL</button>
                <button type="button" class="logo-output-button logo-output-favorite-button" title="favorite">
                    <svg class="logo-output-button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                        <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        `;
        logosOutput.appendChild(outputItself);
        
        // INCREMENTING 
        i++;
    };

    // FAVORITE AND COPY ICON BUTTONS
    const copyIconUrlButtons = document.querySelectorAll('.logo-output-copy-button');
    const favoriteButtons = document.querySelectorAll('.logo-output-favorite-button');

    for (let i = 0; i < copyIconUrlButtons.length; i++) {
        let savedIntoFavorite = false;
        // COPYING THE URL OF AN ICON
        copyIconUrlButtons[i].addEventListener('click', () => {
            navigator.clipboard.writeText(logoData[i].icon);
            copyIconUrlButtons[i].textContent = 'ICON URL COPIED';
            setTimeout(() => copyIconUrlButtons[i].textContent = 'COPY ICON URL',5000)
        });

        // SAVING THE LOGO INTO FAVORITE CONTAINER
        favoriteButtons[i].addEventListener('click', () => {
            if (savedIntoFavorite === false) {
                favoriteButtons[i].classList.add('logo-output-button-favorited');

                // ACTIVATING THE FAVORITE CONTAINER
                isFavoriteContainerActive = true;
                logosOutputFavorites.classList.add('logos-output-favorites-active');
                // ADDING THE FAVORITED ELEMENT INTO THE FAVORITE CONTAINER
                logosOutputFavorites.innerHTML += `
                    <div class="logo-output">
                        <div class="logo-output-image">
                            <img src="${logoData[i].icon}" class="logo-output-image-itself">
                        </div>
                        <div class="logo-output-info" style="flex-direction: ${logoData[i].name.length > 6 ? 'column' : 'row'}; align-items: ${logoData[i].name.length > 6 ? 'flex-start' : 'center'};">
                            <h2 class="logo-output-info-name">${logoData[i].name}</h2>
                            <a href="https://${logoData[i].domain}" target="_blank" class="logo-output-info-domain">${logoData[i].domain}</a>
                        </div>
                        <div class="logo-output-buttons">
                            <button type="button" class="logo-output-button" title="Copy icon URL">COPY ICON URL</button>
                            <button type="button" class="logo-output-button" title="favorite">
                                <svg class="logo-output-button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
                
                savedIntoFavorite = true;
            } else {
                favoriteButtons[i].classList.remove('logo-output-button-favorited');
                
                // REMOVING THE ELEMENT FROM THE FAVORITE CONTAINER
                const logoOutput = logosOutputFavorites.querySelectorAll('.logo-output');
                logosOutputFavorites.removeChild(logoOutput[i]);

                // DEACTIVATING THE FAVORITE CONTAINER IF IT HAS NO ELEMENT
                if (logosOutputFavorites.childElementCount === 1) {
                    isFavoriteContainerActive = false;
                    logosOutputFavorites.classList.remove('logos-output-favorites-active');
                };

                savedIntoFavorite = false;
            };
        });
    };
};
/* 
searchForLogo(); */

// INITIALIZING BUTTONS
searchButton.addEventListener('click', e => {e.preventDefault(); searchForLogo()});