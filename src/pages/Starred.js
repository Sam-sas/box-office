import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

export default function Starred() {
const [starred] = useShows();

const [shows, setShows] = useState(null);
const [isLoading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  if(starred && starred.length > 0) {
    const promises = starred.map(showId => apiGet(`/shows/${showId}`));

    Promise.all(promises)
    .then(apiData => apiData.map(show => ({ show })))
    .then(results => {
      setShows(results);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    })

  } else {
    setLoading(false);
  }
},[starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error occured: {error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  ) 
}
