import React, {useState} from "react";

const MovieFinder = () => {

    const [input, setInput] = useState("")
    const [films, setFilms] = useState(null)
    const [errormsg, setErrorMsg] = useState("")
    const [history, setHistory] = useState([])

    const userInput = (e) => {
        setInput(e.target.value)
    }

    const keyDown = (e) => {
        if (e.key == "Enter"){
            handleInput()
        } 
    }

    const handleInput = () => {
        fetch(`https://www.omdbapi.com/?t=${input}&apikey=6a595e9d`)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.Response === "False"){
                throw new Error(data.Error);
            }

            setFilms(data)
            setErrorMsg("")
            setHistory(prev => [...prev, data.Title])
            setInput("")
        })
        .catch((error) => {
            console.error(error);
            setErrorMsg(error.message);
        })
    }

    const handleHistoryClick = (title) =>{
        handleInput(title)
    }

    return(
        <div className="container-main">
            <div className="header"> 
            <h1>Movie Finder</h1>
            <input onKeyDown={keyDown} onChange={userInput} value={input} placeholder="Your film here" type="text" />
            <button onClick={handleInput}>Search</button>
            </div>

            {errormsg && (
                <p className="error-msg">{errormsg}</p>
            )}

            {films && (
                    <div className="body">
                        <h2>{films.Title}</h2>
                        <img src={films.Poster} alt="" />
                        <p><span>Year:</span> {films.Year}</p>
                        <p><span>Genre:</span> {films.Genre} </p>
                        <p><span>Actors:</span> {films.Actors}</p>
                        <p><span>Director:</span> {films.Director}</p>
                        <p><span>Runtime:</span>{films.Runtime}</p>
                        {history.length > 0 && (
                            <div className="history">
                                <h3>Historial:</h3>
                                <ul>
                                    {history.map((title, index) => {
                                      return <li key={index} onClick={handleHistoryClick} style={{ cursor: "pointer" }}>
                                        {title}
                                        </li>
                                    })}
                                </ul>
                            </div>
                        )}
                    </div> 
            )}
        </div>
    )
}

export default MovieFinder