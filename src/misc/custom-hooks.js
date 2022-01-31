import { useReducer, useEffect, useState } from "react";
import { apiGet } from "./config";

function showsReducer(prevState, action) {
  switch (action.type) {
    case "ADD": {
      return [...prevState, action.showId];
    }
    case "REMOVE": {
      return prevState.filter((showId) => showId !== action.showId);
    }
    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = "shows") {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = "lastQuery") {
  //whenever we use a computation to set initial state use lazy evaluation -- calculated only once when state is initialized
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : "";
  });

  const setPersistedInput = (newState) => {
      setInput(newState);
      sessionStorage.setItem(key, JSON.stringify(newState));
  }

  return [input, setPersistedInput]
}

export function useShow(showId) {
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
    const [state, dispatch ] = useReducer(reducer, {
        show: null,
        isLoading: true,
        error: null
    });

  //only runs once when array is empty
  //if something is used in array, it will run when that obj changes
  useEffect(() => {
    let isMounted = true;
    //id is static so its safe to put in dependencies of component
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
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
  }, [showId]);

  return state;
}
