import { useState, useEffect } from "react";
import Logo from "../../assets/Logo.svg";
import useFetch from "../../hooks/useFetch";
import DataList from "../../components/dataList/DataList.component";
import "./Home.style.css";
import Menu from "../../assets/Menu.svg";
import Header from "../../components/header/Header.component";
import Footer from "../../components/footer/footer.component";

const Home = () => {
  const {
    dataList: moviesList,
    err,
    isPending,
  } = useFetch("https://api.themoviedb.org/3/movie/top_rated");
  const [searchstring, setSearchString] = useState("");
  const [filteredArray, setFilteredarray] = useState([]);

  //show filtered Arrays from SearchBox and also determine when to show just Top 10
  useEffect(() => {
    const newFilteredArray = moviesList.filter((movies) => {
      return movies.title.toLocaleLowerCase().includes(searchstring);
    });
    if (searchstring.length < 1) {
      setFilteredarray(moviesList.slice(0, 10));
    } else {
      setFilteredarray(newFilteredArray);
    }
  }, [searchstring, moviesList]);

  //Search Handler
  const searchEventHandler = (e) => {
    const stringValue = e.target.value.toLocaleLowerCase();
    setSearchString(stringValue);
  };
  return (
    <div className="App">
      <div className="header-bar">
        <img src={Logo} alt="Logo" />
        <input
          className="searchBox"
          type="search"
          placeholder="What do you want to watch"
          onChange={searchEventHandler}
        />
        <img src={Menu} alt="Menu icon" />
      </div>
      {searchstring.length === 0 && <Header />}
      <div className="container">
        <h3 className="movies-category">Featured Movies</h3>

        {err && <div className="fetchInfo">{err}</div>}
        {isPending && <div className="fetchInfo">loading...</div>}
        {filteredArray && <DataList dataList={filteredArray} />}
        {moviesList.length > 0 &&
          filteredArray.length < 1 &&
          searchstring.length > 0 && (
            <div className="fetchInfo">
              <h1>No movie title with:{searchstring}</h1>
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
