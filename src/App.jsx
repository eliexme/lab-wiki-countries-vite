// src/App.jsx
import { useEffect, useState } from 'react'
import './App.css'
import countries from '/src/countries.json'
import Navbar from './components/Navbar'
import CountriesList from './components/CountriesList'
import { Route, Routes } from 'react-router-dom'
import CountryDetails from './components/CountryDetails'
import { useParams } from 'react-router-dom'

function App() {
  const [countriesData, setCountriesData] = useState([])


  useEffect(()=>{

       fetch("https://ih-countries-api.herokuapp.com/countries")
    .then((response) => { 
      return response.json();
    })
    .then((data) => {
      setCountriesData(data)
    })
    .catch( (err) => console.log(err));

  }, [])

  return (
  <div className='App'>

    <Navbar/>

    {countriesData.map((eachCountry)=>{
      return (
        <div>
        <CountriesList eachCountry={eachCountry}/>
      </div>
      )
      
    })}

    <Routes>
      <Route path='/:id' element={<CountryDetails countriesData={countriesData}/>} />
    </Routes>
    
  </div>
  )
}
export default App