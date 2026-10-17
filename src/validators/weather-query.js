import { HttpError } from '../lib/http-error.js';

// TODO (you): check ?city= and return the trimmed city name. Throw a 400
// HttpError with details.city when it breaks a rule from the assignment page.
export function parseCity(value) {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    const err = new HttpError('Validation failed');
    err.status = 400;
    err.details = { city: 'City name is required and must be a non-empty string' };
    throw err;  
  }
  const trimmedCity = value.trim();

  //check if the city name length constraints
  if (trimmedCity.length < 2 || trimmedCity.length > 70) {
    const err = new HttpError('Validation failed');
    err.status = 400;
    err.details = { city: 'City name must be between 2 and 70 characters' };
    throw err;  
  }
  return trimmedCity; 
}

// TODO (you): check ?cities= and return an array of trimmed city names. Throw a
// 400 HttpError with details.cities when it breaks a rule from the assignment page.
export function parseCities(value) {
  //check if the cities parameter is provided and is a non-empty string
  if (!value || typeof value !== 'string' || value.trim() === '') {
    const err = new HttpError('Validation failed');
    err.status = 400;
    err.details = { cities: 'Cities parameter is required and must be a non-empty string' };
    throw err;  
  }

  //split the cities by comma, trim each city, and filter out empty strings
  const cityList = value.split(',').map(c => c.trim()).filter(Boolean);

  if (cityList.length === 0) {
    const err = new Error('Validation failed');
    err.status = 400;
    err.details = { cities: 'At least one valid city must be provided.' };
    throw err;
  }

  //validate each city name length constraints
  cityList.forEach(city => {
    if (city.length < 2 || city.length > 60) {
      const err = new Error('Validation failed');
      err.status = 400;
      err.details = { cities: `Each city name must be between 2 and 60 characters. Invalid: "${city}"` };
      throw err;
    }
  });

  return cityList;
}
