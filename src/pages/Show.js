import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import Cast from "../components/show/Cast";
import Details from "../components/show/Details";
import Seasons from "../components/show/Seasons";
import ShowMainData from "../components/show/ShowMainData";
import { apiGet } from "../misc/config";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";

const reducer = (previousState, action) => {
    switch(action.type) {
        case 'FETCH_SUCCESS': {
            return {...previousState, isLoading: false, show: action.show, error: null}
        }
        case 'FETCH_FAILED': {
            return {...previousState, isLoading: false, error:action.error}
        }
        default: return previousState;
    }
}

const initialState = {
    show: null,
    isLoading: true,
    error: null
}

export default function Show() {
  // custom hooks are built on top of react hooks
  //gets the custom parameter set in the dynamic route in app.js; if :id is changed it will reflect in the name of the param used here
  const { id } = useParams();

  const [{show, isLoading, error}, dispatch ] = useReducer(reducer, initialState);

  //only runs once when array is empty
  //if something is used in array, it will run when that obj changes
  useEffect(() => {
    let isMounted = true;
    //id is static so its safe to put in dependencies of component
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
          if (isMounted) {
              dispatch({ type: 'FETCH_SUCCESS', show: results });
          }
      })
      .catch((error) => {
        if (isMounted) {
            dispatch({ type: 'FETCH_FAILED', error: error.message })
        }
      });

    //will be run when the next callback is fired -- called when component is unmounted
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>Error occured</div>;
  }
  return <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
        />
      <InfoBlock>
          <h2>Details</h2>
          <Details
            status={show.status}
            network={show.network}
            premiered={show.premiered}
          />
      </InfoBlock>
      <InfoBlock>
          <h2>Seasons</h2>
          <Seasons
            seasons={show._embedded.seasons}
          />
      </InfoBlock>
      <InfoBlock>
          <h2>Cast</h2>
          <Cast
            cast={show._embedded.cast}
          />
      </InfoBlock>
  </ShowPageWrapper>;
}
