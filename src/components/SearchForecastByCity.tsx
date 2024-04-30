// components/InputWithOptions.js

import { useRouter } from 'next/navigation'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { getCityToLatLon } from '@/services/cityToLatLon';

const SearchForecastByCity = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await getCityToLatLon(inputValue);
          setOptions(response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    // Fetch data when inputValue changes
    if (inputValue.trim() !== '') {
      fetchData();
    } else {
      setOptions([]); // Clear options when input value is empty
    }
  }, [inputValue]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const createQueryString = (options: { [key: string]: string | number }) => {
    const params = new URLSearchParams();
    Object.keys(options).map(option => {
        if(option !== "local_names"){
            params.set(option, options[option].toString());
        }
      });
    return params.toString();
  };

  const handleOptionClick = (option: {lat: number, lon: number}): void => {
    // Handle option click (you can do whatever you want here, e.g., fill input with option value)
    console.log(option)
    const {lat, lon} = option
    router.push(`/forecast?${createQueryString(option)}`)
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <div className="options-container">
        {options.map((option: {name:string, state: string, country: string}, index) => (
          <div
            key={index}
            className="optionsCity"
            onClick={() => handleOptionClick(option)}
          >
            {`${option?.name} | ${option?.state} | ${option?.country}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForecastByCity;
