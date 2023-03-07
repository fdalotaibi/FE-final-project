/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
let external_API_result
let getWeatherbitResponse
let pixResponse
const today = new Date()
let apiKey = ''
let pixabayKey = ''
// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.geonames.org/findNearByWeatherJSON?'
// weatherbit key
const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily?city='
const pixabayURL = 'https://pixabay.com/api/?key='
let img_url
// Event listener to add function to existing HTML DOM element


if (document.getElementById('generate'))
    document.getElementById('generate').addEventListener('click', performAction);
if (document.getElementById('back'))
    document.getElementById('back').addEventListener('click', showForm)
/* Function called by event listener */
function performAction(e) {
    console.log("clicked");
    getWeatherData(baseURL).then(() => {
        console.log("result ", external_API_result);
        getWeatherbit(weatherbitURL, apiKey).then(() => {
            console.log("result 2 ", getWeatherbitResponse);
            getPix(pixabayURL).then(() => {
                console.log("result 3 ", pixResponse);
                if (document.getElementById("form_section"))
                    document.getElementById("form_section").style.display = 'none'
                if (document.getElementById("result_section"))
                    document.getElementById("result_section").style.display = 'block'

            })
        })

    })


}
/* Function to GET Web API Data*/
const getWeatherData = async (baseURL) => {
    const long = document.getElementById("long").value
    const lat = document.getElementById("lat").value
    const res = await fetch(`${baseURL}lat=${lat}&lng=${long}&username=Demo`)
    try {

        const data = await res.json();
        console.log(data)
        external_API_result = data
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

const getWeatherbit = async (weatherbitURL, apiKey) => {
const city = document.getElementById("city").value 
     const country = document.getElementById("country").value 
   const date = document.getElementById('date').value 

        document.getElementById("text").innerText =  city + ' , ' + country
        document.getElementById("date_text").innerText = date

    // calculate duration
    let date1 = new Date(date)
    // today
    let date2 = new Date()

    // To calculate the time difference of two dates· ·
    let Difference_In_Time = date1.getTime() - date2.getTime()
    // To calculate the no. of days between two dates· · ·
    let Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    Difference_In_Days = Difference_In_Days + 1
    console.log("Difference_In_Days: ", Difference_In_Days);
        document.getElementById("countdown").innerHTML = Difference_In_Days + ' days from now'

    const res = await fetch(`${weatherbitURL}${city}&country=${country}&days=${Difference_In_Days}&key=${apiKey}`)
    try {

        const data = await res.json();
        console.log(data)
        getWeatherbitResponse = data
            document.getElementById("high").innerText = getWeatherbitResponse.data[0].high_temp 
            document.getElementById("low").innerText =  getWeatherbitResponse.data[0].low_temp

            document.getElementById("weather").innerHTML = getWeatherbitResponse.data[0].weather.description
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
const getPix = async (pixabayURL) => {
    const city = document.getElementById("city").value 
    const res = await fetch(`${pixabayURL}${pixabayKey}${city}&image_type=photo&pretty=true`)
    try {

        const data = await res.json();
        console.log(data)
        pixResponse = data
        img_url = data.hits[0].largeImageURL
        if (img_url)
            document.getElementById("city_img").src = img_url
        console.log("img ", document.getElementById("city_img"));
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

function showForm() {
    document.getElementById("form_section").style.display = 'block';
    document.getElementById("result_section").style.display = 'none';
}


document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");
    const date = document.getElementById('date')
    let today = new Date()

    getAPIKeys('/getKeys')


})


// get keys from the server side
const getAPIKeys = async (url = '') => {
    console.log(url)
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
    });

    try {
        const res = await response.json();
        //console.log("got the key from the server : ", res);

        apiKey = res.key
        pixabayKey = res.key2


        return res
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}





export { performAction, getWeatherData, showForm, getAPIKeys }