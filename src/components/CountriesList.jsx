import React from 'react'
import { Link } from 'react-router-dom'

export default function CountriesList({eachCountry}) {
  return (
    <Link to={`/${eachCountry.alpha3Code}`}>
      <img src={`https://flagpedia.net/data/flags/icon/72x54/${eachCountry.alpha2Code.toLowerCase()}.png`} alt= 'country flag'></img>
      <h4>{eachCountry.name.common}</h4>
    </Link>
  )
}
