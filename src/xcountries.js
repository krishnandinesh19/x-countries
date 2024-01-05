import React, { useState, useEffect } from 'react';
import './xcountries.css';

const XCountries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setCountries(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredCountries = countries.filter((country) => {
    const countryName = country.name.common.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    console.log('countryName:', countryName, 'searchTerm:', searchTermLower);
    return countryName.includes(searchTermLower);
  });
  

  return (
    <div className="XCountries">
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="country-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <React.Fragment key={country.cca3}>
              {index > 0 && <div className="separator" />}
              <div className={`country-container`}>

                {/* Updated structure to include country flag and name */}
                <div className="country-card">
                  <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                  <p>{country.name.common}</p>
                </div>

              </div>
            </React.Fragment>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
};

export default XCountries;
