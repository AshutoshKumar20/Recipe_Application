import { useState } from "react"
import "./index.css"

function RecipeCard({ meal }) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]
    const meas = meal[`strMeasure${i}`]
    if (ing && ing.trim()) {
      ingredients.push(`${(meas || "").trim()} ${ing}`.trim())
    }
  }

  const link = meal.strYoutube || meal.strSource || "#"
  const visible = ingredients.slice(0, 5)
  const extra = ingredients.length - 5

  return (
    <div className="card">
      <div className="card-img-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
        <span className="card-badge">{meal.strCategory || "Recipe"}</span>
        {link !== "#" && (
          <button className="play-btn" onClick={() => window.open(link, "_blank")}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </button>
        )}
      </div>
      <div className="card-body">
        <div className="card-title">{meal.strMeal}</div>
        <span className="area-badge">📍 {meal.strArea || "World"}</span>
        <div className="ing-label">Ingredients</div>
        <div className="tags">
          {visible.map((ing, idx) => (
            <span key={idx} className="tag">{ing}</span>
          ))}
          {extra > 0 && <span className="tag">+{extra} more</span>}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [query, setQuery] = useState("")
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (term) => {
    const q = term ?? query
    if (!q.trim()) return

    setLoading(true)
    setSearched(true)
    setMeals([])

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`
      )
      const data = await res.json()
      setMeals(data.meals || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const quickTerms = ["Biryani", "Pasta", "Chicken", "Pizza", "Sushi"]

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Apna<span>Paka</span></div>
        <span style={{ fontSize: 12, color: "#888" }}>Powered by MealDB</span>
      </nav>

      <div className="hero">
        <h1>Discover <em>delicious</em><br />recipes instantly</h1>
        <p>Search from thousands of recipes worldwide</p>

        <div className="search-box">
          <input
            type="text"
            placeholder='Try "chicken", "pasta", "biryani"...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="search-btn"
            onClick={() => handleSearch()}
            disabled={loading}
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        <div className="chips">
          {quickTerms.map((term) => (
            <span
              key={term}
              className="chip"
              onClick={() => { setQuery(term); handleSearch(term) }}
            >
              {term}
            </span>
          ))}
        </div>
      </div>

      <div className="results-section">
        {loading && <div className="loading">Finding recipes...</div>}

        {!loading && searched && meals.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: 40 }}>🔍</div>
            <h3>No recipes found</h3>
            <p>Try a different search term</p>
          </div>
        )}

        {!loading && !searched && (
          <div className="empty-state">
            <div style={{ fontSize: 40 }}>🍽️</div>
            <h3>What are you craving?</h3>
            <p>Search above to get started</p>
          </div>
        )}

        {!loading && meals.length > 0 && (
          <>
            <p style={{ textAlign: "center", color: "#888", marginBottom: "1.5rem", fontSize: 14 }}>
              Found <strong style={{ color: "#333" }}>{meals.length} recipes</strong>
            </p>
            <div className="cards-grid">
              {meals.map((meal) => (
                <RecipeCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}