import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Homepage.styled';

export default function Homepage() {
    const [input, setInput] = useLastQuery();
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
       <SearchInput type="text" 
        placeholder='Search for Something'
        onChange={onInputChange}
        onKeyDown={onKeyDown} 
        value={input} />
        <RadioInputsWrapper>
            <div>
                <CustomRadio 
                    id="shows-search" 
                    value="shows" 
                    checked={isShowSearch} 
                    label="Shows"
                    onChange={onRadioChange} />
            </div>
            <div>
            <CustomRadio 
                    id="actors-search" 
                    value="people" 
                    checked={!isShowSearch} 
                    label="Actors"
                    onChange={onRadioChange} />
            </div>
        </RadioInputsWrapper>
        <SearchButtonWrapper>
         <button type="button" onClick={onSearch}>Search</button>
        </SearchButtonWrapper>
       {renderResults()}
    </MainPageLayout>
  )
 
}
