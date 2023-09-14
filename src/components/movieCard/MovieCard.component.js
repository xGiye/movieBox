import { Link } from "react-router-dom";
import "./MovieCard.style.css";
import { useEffect, useState } from "react";
import FavoriteImg from "../../assets/Favorite.svg";
import Favorited from "../../assets/Favorited.svg";

const MovieCard = ({ dataItem }) => {
  const { title, release_date, poster_path, id } = dataItem;
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavoriteList] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteList(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = () => {
    if (isFavorite) {
      const updateFavorites = favorites.filter((fav) => fav.id !== id);
      setFavoriteList(updateFavorites);
    } else {
      const updateFavorites = [...favorites, dataItem];
      setFavoriteList(updateFavorites);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div data-testid="movie-card" className="movie" key={id}>
      <img
        data-testid="movie-poster"
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt="movie-poster"
        className="poster"
      />

      <div className="favorite">
        <img
          src={isFavorite ? Favorited : FavoriteImg}
          alt={isFavorite ? "A favorite" : "Not Favorite"}
          onClick={toggleFavorite}
        />
      </div>

      <h2 data-testid="movie-title" className="movie-title">
        {title}
      </h2>
      <div data-testid="movie-release-date" className="movie-date">
        {release_date}
      </div>
      <div>
        <Link className="movie-detail-link" to={`/movie/${id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
};
export default MovieCard;
