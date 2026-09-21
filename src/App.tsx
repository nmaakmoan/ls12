import { useState } from "react";
import "./App.css";

function App() {
  const [cat, setCat] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const getCat = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );

      if (!response.ok) {
        throw new Error("Ошибка запроса");
      }

      const data = await response.json();
      setCat(data[0].url);
    } catch {
      setError("Не удалось загрузить котика 😿");
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = () => {
    if (cat && !favorites.includes(cat)) {
      setFavorites([...favorites, cat]);
    }
  };

  return (
    <div className="app">
      <h1> Random Cat</h1>

      {loading && <p>Загрузка...</p>}

      {error && <p className="error">{error}</p>}

      {cat && !loading && (
        <img className="cat" src={cat} alt="Случайный кот" />
      )}

      <div className="buttons">
        <button onClick={getCat}>
          Новый кот 
        </button>

        <button onClick={addFavorite} disabled={!cat}>
          Добавить в избранное
        </button>
      </div>

      <h2>Избранные коты </h2>

      <div className="favorites">
        {favorites.map((favorite, index) => (
          <img
            key={index}
            src={favorite}
            alt="Избранный кот"
          />
        ))}
      </div>
    </div>
  );
}

export default App;