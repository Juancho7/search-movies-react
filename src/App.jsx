import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
import './App.css'

const useSearch = () => {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('It is not possible to search for an empty movie.')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('It is not possible to search a movie with a number.')
      return
    }

    if (search.length < 3) {
      setError('Search must have more than 3 characters.')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

const App = () => {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(debounce(search => {
    console.log('search:', search)
    getMovies({ search })
  }, 500)
  , [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <h1>Buscador de películas</h1>
      <header>
        <form className='form' onSubmit={handleSubmit}>
          <input name='query' onChange={handleChange} value={search} type='text' placeholder='Avengers, Star Wars, The Matrix ...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }} className='error'>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Loading...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
