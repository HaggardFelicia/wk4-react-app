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
      <h1>Director Search</h1>
      <SearchBar onSubmit={handleSearch}/>
    </div>
  )
}

export default App;
