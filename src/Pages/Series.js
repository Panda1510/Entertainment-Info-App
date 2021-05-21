import axios from "axios";
import React, { useEffect, useState } from "react";
import useGenres from "../hooks/useGenre";
import './Trending.css';
import Genres from '../components/Genres';
import SingleContent from '../components/SingleContent';
import CustomPagination from '../components/CustomPagination';

function Series({}) {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  //for genres, we have two states: genres, and selectedGenres
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const genreforURL = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    // console.log(data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="pageTitle">TV Series</span>

      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        genres={genres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        page={page}
        setPage={setPage}
      />

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
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default Series;
