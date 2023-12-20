const URL = 'http://localhost:7070/api/v1/';
const HOTEL_ROUTE = "recipes"; // Assuming this is the correct endpoint for creating recipes

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token);
  };

  const getToken = () => {
    return localStorage.getItem('jwtToken');
  };

  const handleHttpErrors = (res) => {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  };

  const fetchData = (endpoint, method, payload) => {
    const options = makeOptions(method, payload, true); // True adds the token
    return fetch(URL + endpoint, options).then(handleHttpErrors);
  };

  const makeOptions = (method, payload, addToken) => {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    };

    if (addToken) {
      opts.headers["Authorization"] = `Bearer ${getToken()}`;
    }

    if (payload) {
      opts.body = JSON.stringify(payload);
    }

    return opts;
  };

  const createRecipe = (recipeData) => {
    const options = makeOptions("POST", recipeData, true); // Assuming recipeData is formatted correctly
    return fetch(URL + HOTEL_ROUTE, options).then(handleHttpErrors);
    // Replace HOTEL_ROUTE with the correct endpoint for creating a recipe
    // Adjust the payload and endpoint according to your backend API
  };

  return {
    makeOptions,
    setToken,
    getToken,
    fetchData,
    createRecipe, // Add the createRecipe method to the returned object
  };
}

const facade = apiFacade();
export default facade;
