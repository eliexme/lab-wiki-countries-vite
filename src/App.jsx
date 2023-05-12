// src/App.jsx
import { useEffect, useState } from 'react'
import './App.css'
/* import countries from '/src/countries.json' */
import Navbar from './components/Navbar'
import CountriesList from './components/CountriesList'
import { Route, Routes } from 'react-router-dom'
import CountryDetails from './components/CountryDetails'
import axios from 'axios'


function App() {
  const [countriesData, setCountriesData] = useState([])

  const axiosData = async()=>{
    try {
      const response = await axios.get("https://ih-countries-api.herokuapp.com/countries")
      console.log(response)
      if(response.status === 200){
        setCountriesData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    axiosData()
  }, [])

/*   const fetchData = async() =>{
    try {
      const response = await fetch("https://ih-countries-api.herokuapp.com/countries")
      const data = await response.json()
      const dataSorted = data.sort((a, b)=>{
        if(a.name.common < b.name.common)return -1
        else if(a.name.common > b.name.common)return 1
        else return 0
      })
      setCountriesData(dataSorted)

    } catch (error) {
      console.log(error)
    }
  } */

/*   useEffect(()=>{
    fetchData()
  }, []) */


/*   useEffect(() => {
    fetch("https://ih-countries-api.herokuapp.com/countries").then((res) => {
      return res.json().then((data) => {
        data.sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          } else if (a.name.common > b.name.common) {
            return 1;
          } else return 0;
        });
        setCountriesData(data);
      });
    });
  }, []); */

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