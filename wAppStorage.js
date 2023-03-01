
export function setCitiesToLS (favoriteArr) {
    localStorage.setItem('cities', JSON.stringify(favoriteArr))
}

export function getCitiesFromLS () {
    return JSON.parse(localStorage.getItem('cities'))
}