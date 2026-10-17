# City Weather API

TODO (you): one or two sentences on what this service does.

This is an express weather API that utilizes Open-Mateo and returns data about cities including weather forecasts, comparing data between cities, and caches the results.
## Run it

TODO (you): the commands to install and start it, including copying `.env.example` to `.env`.

git init
npm install
cp .env.example .env or copy .env.example .env
npm run dev

## Environment variables

TODO (you): a table with every variable from `.env.example`, its default, and what it controls.

Port 4000: The port number that the server listens on

UPSTREAM_TIMEOUT_MS 5000: The amount of time allowed (in ms) for requests to open-mateo

CACHE_TTL_SECONDS 600: The amount of time that a cached entry will be valid

GEOCODE_URL https://geocoding-api.open-meteo.com/v1/search: URL for looking up cities

FORECAST URL https://api.open-meteo.com/v1/forecast: URL for fetching weather forecasts

## Endpoints

TODO (you): each endpoint with an example request and a short description of the response.

Get City Weather
Example:  curl -i "http://localhost:4000/api/weather?city=Brampton"
-Validate`s city name and returns the city`s location, weather, timezone, and daily forecast data

Compare Cities Weather
Example:  curl -i "http://localhost:4000/api/weather?city=Brampton,Toronto,Vancouver"
-Validates a list of cities and fetches their summaries, then returning an array showing results for each city, including the amount of successful 
or failed searches along with weather comparisons (hottest and coldest cities)

Get Cache Stats
Example: curl -i "http://localhost:4000/api/cache/stats"
-Returns the number of active entries, total hits, total misses, and TTL duration of the cache.


## Testing

TODO (you): one `curl` command for each of the 10 requests on the assignment page, with the status
code it should get on a freshly started server. On Windows, run these in Git Bash. An example to copy:

```bash
# Weather for a city: 200
curl -i "http://localhost:4000/api/weather?city=Toronto"

# Weather for a city that has been cached: 200
curl -i "http://localhost:4000/api/weather?city=Toronto"

# Comparison request for 3 cities: 200
curl -i "http://localhost:4000/api/compare?cities=Vancouver,Halifax,Qwertyville"

# Cache stats endpoint after the 3 previous requests: 200
curl -i "http://localhost:4000/api/cache/stats"

# Invalid city due to character limit (under 2 characters): 400
curl -i "http://localhost:4000/api/weather?city=T"

# Duplicate of city error: 400
curl -i "http://localhost:4000/api/compare?cities=Toronto,Halifax,toronto"

# City does not exist: 404
curl -i "http://localhost:4000/api/weather?city=Qwertyville"

# Upstream timout set to 1ms, resulting in error: 504
curl -i "http://localhost:4000/api/weather?city=Toronto"

# Host does not exist with FORECAST_URL=https://weather.invalid/v1, resulting in error: 502
curl -i "http://localhost:4000/api/weather?city=Toronto"

```



## Data source

TODO (you): credit Open-Meteo with a link to https://open-meteo.com/.

## AI use

TODO (you): each AI tool you used and what for, or "No AI tools used."

For AI usage, I consulted google gemini for advice on structuring my approaches towards the assignment tasks and to understand the topics at hand
