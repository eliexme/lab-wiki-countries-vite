import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function CountryDetails({ countriesData }) {
  const { id } = useParams('');
  const [selectedCountry, setSelectedCountry] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayBorderNames, setDisplayBorderNames] = useState([]);

  const selectedCountryData = async () => {
    try {
      const response = await axios.get(`https://ih-countries-api.herokuapp.com/countries/${id}`);
      if (response.status === 200) {
        setSelectedCountry(response.data);

        const borderPromises = response.data.borders.map(async(selBorderCode)=>{
          const borderData = await axios.get(`https://ih-countries-api.herokuapp.com/countries/${selBorderCode}`)
          return(borderData.data)
        })

        //we have to do promise all bc we are getting an array of promises due to the use of await axios.get
        const borderNames = await Promise.all(borderPromises)
        //once they are all fullfilled, then we set the new value
        setDisplayBorderNames(borderNames)
        /* console.log(borderNames) */

      } else {
        console.log('Selected country not valid');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    selectedCountryData();
  }, [id]);

  return (
    <div className='details'>
      {isLoading ? (
        <p>Loading data...</p>
      ) : selectedCountry.name ? (
        <>
          <img src={`https://flagpedia.net/data/flags/icon/72x54/${selectedCountry.alpha2Code.toLowerCase()}.png`} alt='country flag' />
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital} km2</p>
          <p>Area: {selectedCountry.area}</p>
          <ul>
            Borders:
            {selectedCountry.borders.length === 0?
            <p>no borders to show</p>

            : displayBorderNames.map((eachBorderInfo)=>{
              return(
                <li key={eachBorderInfo.alpha3Code}>
                  <Link to={`/${eachBorderInfo.alpha3Code}`}>{eachBorderInfo.name.common}</Link>
                </li>
                
                )
            })
            }
          </ul>
        </>
      ) : (
        <p>Selected country not valid</p>
      )}
    </div>
  );
}
