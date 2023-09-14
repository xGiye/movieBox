import "./Header.style.css";

const Header = () => {
  return (
    <header className="App-header">
      <div className="con-header">
        <h2 className="movie-title-header">John Wick 3 : Parabellum</h2>
        <div className="movie-rating"></div>
        <p className="movie-description">
          John Wick is on the run after killing a member of the international
          assassins' guild, and with a $14 million price tag on his head, he is
          the target of hit men and women everywhere.
        </p>

        <input type="button" className="trailerButton" value="Watch Trailer" />
      </div>
    </header>
  );
};
export default Header;
