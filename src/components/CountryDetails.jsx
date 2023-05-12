import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function CountryDetails({countriesData}) {
  const {id} = useParams('')

  const selectedCountry = countriesData.filter((eachCountry)=>{
    return(eachCountry.alpha3Code === id)
  })[0]

  const borderInfo = countriesData.filter((eachCountry)=>{
    return(selectedCountry.borders.includes(eachCountry.alpha3Code))
  })


  return (
    <div className='details'>
      <img src={`https://flagpedia.net/data/flags/icon/72x54/${selectedCountry.alpha2Code.toLowerCase()}.png`} alt= 'country flag'></img>
      <h2>{selectedCountry.name.common}</h2>
      <p>Capital: {selectedCountry.capital} km2</p>
      <p>Area: {selectedCountry.area}</p>
      <ul>Borders:
        {borderInfo.map((eachOne, i)=>{
          return(
            <div>
            <Link to={`/${eachOne.alpha3Code}`}>{eachOne.name.common}</Link>
            </div>
            
            )
        })}
      </ul>
    </div>
  )
}
