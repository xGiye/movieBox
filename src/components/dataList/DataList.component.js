import MovieCard from "../movieCard/MovieCard.component";
import "./DataList.style.css";

const DataList = ({ dataList }) => {
  return (
    <div className="movie-list">
      {dataList.map((dataItem) => {
        return <MovieCard dataItem={dataItem} key={dataItem.id} />;
      })}
    </div>
  );
};
export default DataList;
