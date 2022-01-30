import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';

export default function Homepage() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isShowSearch = searchOption === 'shows';

    const onInputChange = (event) => {
        setInput(event.target.value);
    }

    const onKeyDown = (event) => {
        //keycode for enter is 13
        if(event.keyCode === 13) {
            onSearch();
        }
    }
    //calling the exported general function from config.js (created, not some prebuilt file)
    const onSearch = () => {
        //Using TVmaze api -- https://www.tvmaze.com/api
        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
        });
    }

    const renderResults = () => {
        if(results && results.length === 0) {
            return <div>No results</div>
        }
        if(results && results.length > 0) {
            return  results[0].show ?  (
            <ShowGrid data={results} />
            ) : (
            <ActorGrid data={results} />
            )
        }

        return null;
    }

    const onRadioChange = (event) => {
        setSearchOption(event.target.value);
    }

  return (
    <MainPageLayout>
       <input type="text" 
        placeholder='Search for Something'
        onChange={onInputChange}
        onKeyDown={onKeyDown} 
        value={input} />
        <div>
            <label htmlFor='shows-search'>
                Shows
                <input id="shows-search" 
                    type="radio" value="shows" 
                    onChange={onRadioChange} 
                    checked={isShowSearch} />
            </label>
            <label htmlFor='actors-search'>
                Actors
                <input id="actors-search" 
                    type="radio" value="people" 
                    onChange={onRadioChange}  
                    checked={!isShowSearch} />
            </label>
        </div>
       <button type="button" onClick={onSearch}>Search</button>
       {renderResults()}
    </MainPageLayout>
  )
 
}
