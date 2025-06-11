export default async function handler(req, res) {
    const city = req.query.city || 'Colombo'
    const API_KEY = process.env.WEATHER_API_KEY
  
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
    const data = await response.json()
  
    if (response.ok) {
      res.status(200).json(data)
    } else {
      res.status(response.status).json(data)
    }
  }
  