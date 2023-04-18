const weather = {
  // would typically never store an API key on the front end since anyone can see it,
  // and instead would get this data on the back end, but this is
  // fine for a demo app.
  apiKey: "81fa9159c2e0a99d049531144d62033b",
  fetchWeather: function (city) {
    // fetch api is good to learn, but terrible developer experience.
    // in real apps we will use a data fetching library like axios at the bare minimum,
    // but even that is not ideal. In react we prefer react-query (now named tan stack query)
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          // unable to find city
          alert(data.message);
          // would be better to render error message to the actual page
          // using alerts is bad practice, but this demonstrates handling errors.
        } else {
          this.displayWeather(data);
        }
      });
  },
  displayWeather: function (data) {
    // If we used typescript instead of javascript, you could declare the shape of
    // "data" in advance and know exactly what to expect without having to console
    // log the response to see what we get back from this API.
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(temp) + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed " + Math.round(speed) + "mph";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/random/?" + name + "')";
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search button");

searchButton.addEventListener("click", function () {
  weather.search();
  // clear text after user submits
  searchBar.value = "";
});

searchBar.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
    // clear text after user submits
    event.target.value = "";
  }
});

weather.fetchWeather("Detroit");
