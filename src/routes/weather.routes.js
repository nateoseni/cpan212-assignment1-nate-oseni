import { Router } from 'express';
import { parseCity, parseCities } from '../validators/weather-query.js';
import { getCityWeather } from '../lib/weather.js';


export const weatherRouter = Router();

// TODO (you): GET /api/weather?city=Toronto
// Validate with parseCity, get the summary with getCityWeather, and respond
// with { data, attribution }. Routes never call fetch themselves.
weatherRouter.get('/weather', (req, res, next) => {
  try {
    
    //validate with parseCity
    const validatedCity = parseCity(req.query.city);
    //get the summary with getCityWeather
    const weatherData = getCityWeather(validatedCity);

    //respond with data and attribution
    return res.status(200).json({ 
      data: weatherData, 
      attribution: 'Weather data provided by Open-Meteo' 
    });
  } catch (err) {
    next(err);
  }
});

// TODO (you): GET /api/compare?cities=Toronto,Vancouver,Halifax
// Validate with parseCities, start every lookup at once with Promise.allSettled,
// then build the cities array and the summary described on the assignment page.
weatherRouter.get('/compare', (req, res, next) => {
  try {
    const validatedCities = parseCities(req.query.cities);
    const weatherPromises = validatedCities.map(city => getCityWeather(city));
    const weatherResults = await Promise.allSettled(weatherPromises);

    const cities = weatherResults.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return { error: `Failed to fetch weather for ${validatedCities[index]}` };
      }
});
