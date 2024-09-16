let weatherDisplay = document.querySelector(".weatherDisplay");

// GET COORDINATES
const findMe = () => {
  

    const success = (position) => {
      console.log(position);
      status.textContent = "success";
      const { latitude, longitude } = position.coords;

      fetchData(latitude, longitude);
    };
    const error = () => {
      
    };
  
    navigator.geolocation.getCurrentPosition(success, error);
  };

findMe();

async function fetchData(latitude, longitude)
{
    let latAndLongPoints = `https://api.weather.gov/points/${latitude},${longitude}`;
    let forecastUrl;

    await fetch(latAndLongPoints)
        .then(response => response.json())
        .then(data => 
        {
            forecastUrl = data.properties.forecast;
        })
        .catch(error =>
        {
            console.log(error);
        })

    console.log(forecastUrl);

    await fetch(forecastUrl)
        .then(response => response.json())
        .then(data => 
        {
            console.log(data.properties.periods);

            for (let i = 0; i < data.properties.periods.length; i += 2)
            {
                let column = document.createElement("div");
                let mobileSpacing = document.createElement("div");

                column.classList = "col-4 col-xl-3 text-center weatherColumn";
                mobileSpacing.classList = "col-4 d-xl-none"

                column.innerHTML =  `<h3>${data.properties.periods[i].name}</h3>
                                    Low and High: ${data.properties.periods[i+1].temperature}°F, ${data.properties.periods[i].temperature}°F <br />
                                    Weather Conditions: <br /> 
                                    ${data.properties.periods[i].shortForecast} <br /> <br />
                                    <img src="${data.properties.periods[i].icon}" alt="">`;

                weatherDisplay.append(mobileSpacing.cloneNode(true));
                weatherDisplay.append(column);
                weatherDisplay.append(mobileSpacing.cloneNode(true));
            }
        })
        .catch(error =>
        {
            console.log(error);
        })
}

fetchData();