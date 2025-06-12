const loading = document.getElementById("loading")
const weatherCard = document.getElementById("weatherCard")
const errorDiv = document.getElementById("error")
const searchBtn = document.getElementById("searchBtn")
const cityInput = document.getElementById("cityInput")

const elements = {
  location: document.getElementById("location"),
  localtime: document.getElementById("localtime"),
  icon: document.getElementById("icon"),
  condition: document.getElementById("condition"),
  temp: document.getElementById("temp"),
  feelslike: document.getElementById("feelslike"),
  humidity: document.getElementById("humidity"),
  wind: document.getElementById("wind"),
  uv: document.getElementById("uv"),
}

async function fetchWeather(city) {
  loading.classList.remove("hidden")
  weatherCard.classList.add("hidden")
  errorDiv.classList.add("hidden")

  try {
    const res = await fetch(`./api/weather?city=${city}`)
    if (!res.ok) throw new Error("Invalid city")
    const data = await res.json()

    elements.location.textContent = `${data?.location?.name}, ${data?.location?.country}`
    elements.localtime.textContent = `Local Time: ${data?.location?.localtime}`
    elements.temp.textContent = data?.current?.temp_c
    elements.feelslike.textContent = data?.current?.feelslike_c
    elements.humidity.textContent = data?.current?.humidity
    elements.wind.textContent = data?.current?.wind_kph
    elements.uv.textContent = data?.current?.uv
    elements.icon.src = `https:${data?.current?.condition?.icon}`
    elements.icon.alt = data?.current?.condition?.text
    elements.condition.textContent = data?.current?.condition?.text

    weatherCard.classList.remove("hidden")
  } catch (err) {
    errorDiv.classList.remove("hidden")
  } finally {
    loading.classList.add("hidden")
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim() || "Colombo"
  fetchWeather(city)
})

fetchWeather("Colombo")
