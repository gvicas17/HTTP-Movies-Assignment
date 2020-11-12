import React, {useState, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'


const initalFormValue = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: Number(),
    stars: []
}


const AddMovie = (props) => {
    const [formValue, setFormValue] = useState(initalFormValue)


    const handleChange = (e) => {
        e.persist()
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
       axios.post('http://localhost:5000/api/movies', formValue)
       .then(res => props.setMovieList (res.data))
       .catch(err => console.log(err))
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
                {/* <label>Stars:
                    <input
                        type = 'text'
                        name = 'stars'
                        value = {formValue.stars}
                        onChange ={handleChange}
                    />
                </label> */}
                <button>Add New Movie</button>
            </form>
        </div>
    )
}

export default AddMovie