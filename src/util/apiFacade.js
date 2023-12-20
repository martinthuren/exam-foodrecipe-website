const URL = 'http://localhost:7070/api/v1/';
const HOTEL_ROUTE = "recipes"; 

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
    const options = makeOptions("POST", recipeData, true); 
    return fetch(URL + HOTEL_ROUTE, options).then(handleHttpErrors);

  };

  return {
    makeOptions,
    setToken,
    getToken,
    fetchData,
    createRecipe, 
  };
}

const facade = apiFacade();
export default facade;
