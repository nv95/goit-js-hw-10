const ENDPOINT = 'https://restcountries.com/v2/name/';
const COUNTRY_VALUES = 'fields=name,capital,population,flags,languages';

function fetchCountries(name){
    return fetch(`${ENDPOINT}${name}?${COUNTRY_VALUES}`)
    .then((res)=> res.json())
    .catch(error => console.log(error));
}

export default {fetchCountries};    