// packages and variables
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurantList = require('./restaurant.json')

// set express template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// set router: get homepage
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
});

// set router: get show page
app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === id)
  res.render('show', { restaurant })
})

// set router: get search result
app.get('/search', (req, res) => {
  const { keyword } = req.query
  const word = keyword.trim().toLowerCase()
  const filteredData = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(word)
      || restaurant.category.toLowerCase().includes(word)
  })
  const notFound = filteredData.length ? false : true
  res.render('index', { restaurants: filteredData, keyword: keyword, notFound })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})