const query = document.querySelector('header.search input')
const search = document.querySelector('header.search button')
const cards = document.querySelector('section.cards')

// `https://www.themealdb.com/api/json/v1/1/search.php?s=${query.value}`
const extractIngredients = (meal) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ing && ing.trim()) {
            ingredients.push(`${measure} ${ing}`)
        }
    }
    return ingredients;
}