const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);

hbs.registerPartials(partialsDirectory);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Tyoma'
  })
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Tyoma'
  })
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Tyoma',
    message: 'Useful help message'
  })
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  geocode(address, (error, locationData) => {
    if (error) {
      return res.send({error})
    }

    forecast(locationData, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }

      res.send({
        location: locationData.location,
        forecast: forecastData,
        address: locationData.location
      });
    })
  });

});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query);
  res.send({
    products: []
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 ERROR',
    name: 'Tyoma',
    message: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 ERROR',
    name: 'Tyoma',
    message: 'Page not found'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});