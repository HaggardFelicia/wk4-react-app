import React from 'react';
import {useState} from 'react';

function SearchBar({onSubmit}){
    const [term, setTerm]= useState('');

    const handleChange = event => {
        console.log('event.target.value', event.target.value);
        setTerm(event.target.value);
    }

    return(
        <div style={styles.searchBar}>
            <h3>Search Bar</h3>
            <form onSubmit={onSubmit} style={styles.h3}>
                <label htmlFor='search'>Search:</label>
                <input
                    type='text'
                    id='search'
                    name='search'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    id='name'
                    name='name'
                    value={term}
                />
                {term.length <3 && <p>Search term must be at least 3 characters</p>}
            </form>
        </div>
    );
}

export default SearchBar;

const styles = {
    searchBar: {
        backgroundColor: '#28666e',
        padding: '1vh'
    },
    h3: {
        color: 'white',
        fontSize: '20px',
        textAlign: 'center'
    }
};