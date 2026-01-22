const app_id = "62b8e9d0";
const app_key = "a0346239bb6b1dd70086069089a17bc7";

let query = document.querySelector("header.search input");
let search = document.querySelector("header.search button");

const handleSearch = async () => {
    try {
        //const endpoint = `https://api.edamam.com/search?q=${query.value}&app_id=${app_id}&app_key${app_key}`
        const response = await fetch("http://localhost:5000/recipes?q=")
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));



    }
    catch (error) {
        console.log(error);

    }

}
search.addEventListener('click', handleSearch);