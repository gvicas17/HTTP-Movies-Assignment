import React, {useState, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'


const initalFormValue = {
    title: '',
    director: '',
    metascore: ''
}


const UpdateMovie = (props) => {
    const history = useHistory()
    const {id} = useParams()
    const [formValue, setFormValue] = useState(initalFormValue)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setFormValue(res.data))
        .catch(err => console.log(err))
    },[id])

    const handleChange = (e) => {
        e.persist()
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, formValue)
        .then(res => {
            const updatedMovies = props.movieList.map(movie => {
                return movie.id === id ? res.data : movie;
            })
            props.setMovieList(updatedMovies)
        })
        .catch(err => console.log(err))
        history.push('/')

    }

    return(
        <div>
            <form onSubmit = {handleSubmit}> 
                <label>Title:
                    <input
                    type='text'
                    name = 'title'
                    value = {formValue.title}
                    onChange ={handleChange}
                    />
                </label>
                <label>Director:
                    <input
                    type = 'text'
                    name = 'director'
                    value = {formValue.director}
                    onChange ={handleChange}
                    />
                </label>
                <label>Metascore:
                    <input
                        type = 'text'
                        name = 'metascore'
                        value = {formValue.metascore}
                        onChange ={handleChange}
                    />
                </label>
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie