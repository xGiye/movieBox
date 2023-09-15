import { useState } from "react";
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
  } = useFetch("https://api.themoviedb.org/3/movie/top_rated?");

  const [searchstring, setSearchString] = useState("");
  // const [filteredArray, setFilteredarray] = useState([]);

  const {
    dataList: searchList,
    err: errSearch,
    isPending: isPendingSearch,
  } = useFetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchstring}&`
  );

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

        {searchstring.length === 0 && err && (
          <div className="fetchInfo">{err}</div>
        )}
        {searchstring.length === 0 && isPending && (
          <div className="fetchInfo">loading...</div>
        )}
        {searchstring.length === 0 && (
          <DataList dataList={moviesList.slice(0, 10)} />
        )}
        {searchstring.length > 0 && isPendingSearch && (
          <div className="fetchInfo">Loading</div>
        )}
        {searchstring.length > 0 && errSearch && (
          <div className="fetchInfo">{errSearch}</div>
        )}
        {searchstring.length > 0 && !errSearch && !isPendingSearch && (
          <DataList dataList={searchList} />
        )}

        {searchstring.length > 0 &&
          !errSearch &&
          searchList.length === 0 &&
          !isPendingSearch && <div>No movie with title : {searchstring}</div>}

        {searchstring.length > 0 &&
          !errSearch &&
          searchList.length === 0 &&
          !isPendingSearch && <div>No movie with title : {searchstring}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
