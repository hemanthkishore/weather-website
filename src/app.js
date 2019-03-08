const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const port = 3000

// Define paths for express config
const publicdirpath = path.join(__dirname, '../public')
const viewspath     = path.join(__dirname, '../templates/views')
const partialsPath  = path.join(__dirname, '../templates/partials')

// setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicdirpath))

app.get('', (req, res)=>{
    return res.render('index', {
        title: 'weather app',
        name: 'Hemanth Kishore'
    })
})

app.get('/about', (req, res) => {
    return res.render('about', {
        title: 'About me',
        name: 'Hemanth Kishore'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helptext:'This is some helpful text ',
        title: 'Help',
        name: 'Hemanth Kishore'
    })
})

app.get('/weather', (req, res)=>{

    if (!req.query.address) {
        return res.send('Please provide an address')
    }

    geocode(req.query.address, (error, data = {}) => {
        if(error) {
            res.send(error)
        } else {
            forecast(data, (error, forecastdata = {}) => {
                if(error) {
                    res.send(error)
                } else {
                    res.send({
                        forecast: forecastdata,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Hemanth Kishore',
        errormessage: 'Help not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hemanth Kishore',
        errormessage: 'Page Not found'
    })
})

app.listen(port, ()=>{
    console.log('server is up and running on port 3000')
})