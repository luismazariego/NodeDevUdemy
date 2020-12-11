const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// Assigned by Heroku or use 3000 by default
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/parcials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); //root

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Luis Mazariego'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Luis Mazariego'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help Section',
        title: 'Help',
        name: 'Luis Mazariego'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });    
    
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error404',
    {
        title: '404',
        name: 'Luis',
        error: 'Help article not found'
    });
});

// Match anything that has not matched 
app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Luis',
        error: 'My 404 Page'
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// app.com          --> root
// app.com/help     
// app.com/about
// root, req => require, res => response
// app.get('', (req, res) => {
    //     res.send('<h1>Weather</h1>');
    // })
    
    // app.get('/help', (req, res) => {
        //     res.send({
            //         name: 'Luis',,
            //         age: 30
            //     }, {
//             name: 'Ranger',
//         age: 8
//     });
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'San Salvador'
//     });
// });

// app.get('/about', (req, res) => {
    //     res.send('<h1>About</h1>');
    // })