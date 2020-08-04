const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

//craeting Express application
const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)  //To set up hbs module



//set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=> {
    res.render('index', {
        title : 'Weather App',
        name : 'Shantanu Roy'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title : 'About Me',
        name : 'Shantanu Roy'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        msg : 'This is help page',
        title : 'Help',
        name : 'Shantanu Roy'
    })
})

app.get('/weather', (req,res)=> {

    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {longnitude, latitude, location} = {})=> {
        if(error) {
            return res.send({error})
        }

        forecast(longnitude, latitude, (error, data)=> {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : data,
                address : req.query.address,
                location
            })
        })
    })
})

    

app.get('/products', (req, res)=> {
    
    if(!req.query.search) {
        return res.send({
            error : 'You must enter seerch term'
        })
    }   
    console.log(req.query)
    res.send({
        product : []
    })
})

app.get('/weather/forecast', (req, res)=> {
    res.send('Weather forecast')
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        msg : 'Help Article not found',
        title : 'Not found',
        name : 'Shantanu Roy'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        msg : 'Page not found',
        name : 'Shantanu Roy'
    })
})

app.listen(port, ()=> {
    console.log('Server is up & running on port ' + port)
})