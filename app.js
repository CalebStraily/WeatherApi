let weatherDisplay = document.querySelector(".weatherDisplay");

// GET COORDINATES
const findMe = () => 
{
  
    const success = (position) => 
    {
        status.textContent = "success";
        const { latitude, longitude } = position.coords;

        fetchData(latitude, longitude);
    };
    const error = () => 
    {
        console.log(error);
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

    await fetch(forecastUrl)
        .then(response => response.json())
        .then(data => 
        {
            for (let i = 0; i < data.properties.periods.length - 1; i++)
            {
                let dayObject = 
                {
                    name: data.properties.periods[i].name,
                    lowTemp: data.properties.periods[i].temperature,
                    highTemp: data.properties.periods[i].temperature,
                    conditions: data.properties.periods[i].shortForecast,
                    imgSource: data.properties.periods[i].icon
                }

                if (i == 0)
                {
                    createAndAppendElements(dayObject);
                }
                else if (i > 0 && data.properties.periods[i].isDaytime == true)
                {
                    createAndAppendElements(dayObject);
                }
            }
        })
        .catch(error =>
        {
            console.log(error);
        })
}

function createAndAppendElements(dayObject)
{
    let column = document.createElement("div");
    let mobileSpacing = document.createElement("div");

    column.classList = "col-8 col-xl-3 text-center weatherColumn";
    mobileSpacing.classList = "col-2 d-xl-none";

    column.innerHTML =  `<h3>${dayObject.name}</h3>
                        Low and High: ${dayObject.lowTemp}°F, ${dayObject.highTemp}°F <br />
                        Weather Conditions: <br /> 
                        ${dayObject.conditions} <br /> <br />
                        <img src="${dayObject.imgSource}" alt="">`;

    weatherDisplay.append(mobileSpacing.cloneNode(true));
    weatherDisplay.append(column);
    weatherDisplay.append(mobileSpacing.cloneNode(true));
}