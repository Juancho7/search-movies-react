const ListOfMovies = ({ movies }) => {
  return (
    <ul className='movies'>
      {
        movies.map(movie => (
          <li key={movie.id} className='movie'>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
    }
    </ul>
  )
}

const NoMovieResults = () => {
  return (
    <p>No movies were found for this search</p>
  )
}

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMovieResults />
  )
}
