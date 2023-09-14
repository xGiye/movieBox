import { Link, useParams } from "react-router-dom";
import "./Detail.style.css";
import useFetch from "../../hooks/useFetch";
import Logo from "../../assets/Logo.svg";
import Footer from "../../components/footer/footer.component";

const Details = () => {
  const { id } = useParams();
  const {
    dataList: movie,
    err,
    isPending,
  } = useFetch(`https://api.themoviedb.org/3/movie/${id}`);
  const {
    budget,
    title,
    backdrop_path,
    revenue,
    runtime,
    status,
    tagline,
    release_date,
    overview,
  } = movie;
  const img = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  // let UTCrelease_date = release_date.split("-");
  // console.log(release_date, UTCrelease_date);
  return (
    <div className="pageDetails">
      <div className="detailNav">
        <img src={Logo} alt="Logo" />
        <Link className="backToHome" to={`/`}>
          Home
        </Link>
      </div>
      {err && <div className="fetchMessage">{err}</div>}
      {isPending && <div className="fetchMessage">loading...</div>}
      {movie.length !== 0 && (
        <div className="detailsContainer">
          <img src={img} alt="movie-banner" className="backdrop" />
          <div className="details">
            <h1 data-testid="movie-title">{title}</h1>
            <span>{status}</span>
            <p>{tagline}</p>
            <p>
              Date of release:{" "}
              <span data-testid="movie-release-date">{release_date}</span>
            </p>
            <p>
              Runtime: <span data-testid="movie-runtime">{runtime}mins</span>
            </p>
            <p data-testid="movie-overview">{overview}</p>
            <div>
              <p>
                Budget: <span>{budget}</span>
              </p>
              <p>
                Revenue: <span>{revenue}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Details;
