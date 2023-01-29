import './css/styles.css';
import API from './fetchCountries.js'
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;



const refs ={
    countryInput: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}


refs.countryInput.addEventListener('input', debounce(onSerchBar,DEBOUNCE_DELAY));

function onSerchBar(e) {
    e.preventDefault();

    const name = refs.countryInput.value.trim();
    if(name ===''){
        return (refs.countryList.innerHTML =''), (refs.countryInfo.innerHTML='');

    }

    API.fetchCountries(name)
    .then(country =>{
        refs.countryList.innerHTML ='';
        refs.countryInfo.innerHTML ='';

        if (country.length === 1){
            refs.countryInfo.insertAdjacentHTML('beforeend',murkupCountryInfo(country))
        } else if (country.length >=10) {
            moreThenTen();
        } else {
            refs.countryList.insertAdjacentHTML('beforeend',murkupCountryList(country))
        }
    })
    .catch(wrongCountry);
}

function moreThenTen(){
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function wrongCountry(){
 Notiflix.Notify.failure('Oops, there is no country with that name')
}

function murkupCountryList(country) {
    return country
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__item--flag" src="${flags.svg}" alt="Flag of ${name}">
              <h2 class="country-list__item--name">${name}</h2>
          </li>
          `;
    })
    .join('');   
}

function murkupCountryInfo(country) {

    return country
    .map(({name,capital,population,flags,languages}) =>{
        return `
        <ul class = 'country-info__list'>
            <li class = 'contry-info__item'>
                <img class = 'country-info__item--flag' src='${flags.svg}' alt = 'Flag of ${name}'> 
                <h2 calss = 'country-info__item--name'> ${name} </h2>
            </li>
            <li class = 'country-info__item'><span class 'country-info__item--catrgorys' > Capital: </span>${capital}</li>
            <li class = 'country-info__item'><span class 'country-info__item--catrgorys' > Population: </span>${population}</li>
            <li class = 'country-info__item'><span class 'country-info__item--catrgorys' > Languages: </span>${Object.values(languages[0]).join('')}</li>
        </ul>  
        `;
    })
    .join('');
}
