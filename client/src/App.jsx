import React from 'react';
import './index.css';
import SearchBar from './components/SearchBar';

function App(){
  const handleSearch = async event => {
    event.preventDefault();
    console.log("searching...", event.target.search.value);
  };

  return(
    <div>
      <SearchBar onSubmit={handleSearch}/>
    </div>
  )
}

export default App;
