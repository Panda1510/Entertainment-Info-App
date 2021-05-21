import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../components/SingleContent";
import './Trending.css';
import CustomPagination from '../components/CustomPagination';

function Trending() {
  const [content, setContent] = useState([]);

  //have to define a state for pagination to work just as did for content;
  const [page, setPage] = useState(1);

  // async as fetching data
  // used axios for fetching
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    // console.log(data);
    setContent(data.results);
  };

  //note dont forget to call the function XD;
  useEffect(() => {
    fetchTrending();
  }, [page]); //so that everytime page changes this gets fired up

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {/* c.name is for tv-serieses 
            c.vote_average is for ratings*/}
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>

      <CustomPagination setPage = {setPage} />
    </div>
  );
}

export default Trending;
