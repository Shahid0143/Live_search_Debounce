import React, { useState, useEffect } from "react";

const fetchData = (searchTerm) => {
  const fruitList = [
    "Apple",
    "Apricot",
    "Application",
    "Banana",
    "Mango",
    "Orange",
  ];
  return new Promise((resolve) => {
    setTimeout(() => {
      
      resolve(
        fruitList.filter((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 1000); 
  });
};


const useDelayedValue = (input, waitTime) => {
  const [delayedInput, setDelayedInput] = useState(input);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedInput(input); 
    }, waitTime);

    return () => {
      clearTimeout(timer); 
    };
  }, [input, waitTime]);

  return delayedInput;
};

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false)


  const debouncedSearchTerm = useDelayedValue(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true); 
      fetchData(debouncedSearchTerm).then((results) => {
        setSearchResults(results) 
        setIsLoading(false)
      });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search fruits..."
      />
      {isLoading && <p>Loading...</p>} 
      <ul>
        {searchResults.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
