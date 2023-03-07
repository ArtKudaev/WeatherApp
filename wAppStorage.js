const KEY = 'favorite-cities';

export function saveFavoriteCities (favoriteArr) {
    localStorage.setItem(KEY, JSON.stringify(favoriteArr))
}

export function getFavoriteCities () {
    return JSON.parse(localStorage.getItem(KEY)) || []
}

export function getCurrentCity() {
    const favoriteCities = JSON.parse(localStorage.getItem(KEY));
    if (favoriteCities === null) {
        alert('LETS START!');
    }
    else{
        const currentCity = favoriteCities[favoriteCities.length - 1];
        return currentCity;
    }
}