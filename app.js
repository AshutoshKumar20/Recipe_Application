const query = document.querySelector('header.search input')
const search = document.querySelector('header.search button')
const cards = document.querySelector('section.cards')

const generateCard = (image, label, category, area, link, ingredients) =>
    `
    <aside>
        <img src=${image} alt=${label}/>
        <a href=${link} class="button" target="_blank">
        <span class="icon icon-play"></span>
        </a>
    </aside>

    <article>
    <h2>${label}</h2>
    <h3>${category} ${area}</h3>

    <ul>
    <li><span class="icon icon-clock"></span><span>N/A</span></li>
    <li><span class="icon icon-level"></span><span>Beginner</span></li>
    </ul>

    <p class="ingredients">
    <span>Ingredients: </span>
    <ul>
    ${ingredients.map(i => `<li>${i}</li>`).join("")}
    </ul>
    </p>
    </article>
`

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

const handleSearch = async () => {
    cards.innerHTML = "";
    try {
        const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query.value}`;
        const response = await fetch(endpoint);
        const data = await response.json();

        if (!data.meals) {
            cards.innerHTML = "<p>No Recipies Found</p>"
            return
        }

        data.meals.forEach(meal => {
            const ingredients = extractIngredients(meal);
            const ele = document.createElement("div");
            ele.classList.add("recipe-card");
            ele.innerHTML = generateCard(
                meal.strMealThumb,
                meal.strMeal,
                meal.strMealCategory,
                meal.strArea,
                meal.strYoutube || meal.strSource || "#",
                ingredients
            )
            cards.appendChild(ele);
        });
    }
    catch (error) {
        console.log(error);
    };

}
search.addEventListener("click", handleSearch);