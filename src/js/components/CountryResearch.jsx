import React, { useState } from "react";



const CountryResearch = () => {

    const [input, setInput] = useState("")
    const [info, setInfo] = useState([])
    const [errorMsg, setErrorMsg] = useState("")

    const userInput = (e) => {
        setInput(e.target.value)
    }

    const keyDownInput = (e) =>{
        if (e.key == "Enter"){
            handleClick()
        } 
    }

    const handleClick = () => {
        fetch(`https://restcountries.com/v3.1/name/${input}?fullText=true`)
        .then(resp => {
            if (!resp.ok) throw new Error("País no encontrado")
            return resp.json()})
        .then((data) => { 
            setInfo(data);
            setErrorMsg("");
            setInput("");
        })
        .catch(error => {
            console.error(error);
            setInfo([]);
            setErrorMsg(error.message);
        })
    };


    return (
        <div className="container-main">
            <div className="header">
                <h1>Busca un país</h1>
                <input onKeyDown={keyDownInput} onChange={userInput} value={input} type="text" placeholder="Escribe aquí el país" />
                <button onClick={handleClick}>Buscar</button>
            </div>
            
              {errorMsg && (
                        <p className="error-msg" >{errorMsg}</p>
                    )}

            {info.map((inf, index)=>(
                <div className="body" key={index}>
                    <h2>{inf.name.common}</h2>
                    <img src={inf.flags.svg} alt={inf.name.common} />
                    <p><span>Capital:</span> {inf.capital?.[0]}</p>
                    <p><span>Lenguas:</span> {inf.languages ? Object.values(inf.languages).join(", ") : "No disponible"}</p>
                    <p><span>Población:</span> {inf.population}</p>
                    <p><span>Continente:</span> {inf.continents?.[0]}</p>
                    <p><span>Moneda:</span> {inf.currencies ? Object.values(inf.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(", ") : "No disponible"} </p>
                    <p><span>Fronteras:</span> {inf.borders ? inf.borders.join(", ") : "Ninguno"} </p>
                </div>
            ))}
        </div>
    )
}

export default CountryResearch