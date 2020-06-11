const path = require('path')
const express = require('express')
const hbs = require('hbs')
const  geocode = require('./utils/geocode')
const  forecast = require('./utils/forecast')

//app üzerinde tanımlı fonksyionlarla kontrol edicez
const app = express()
const port = process.env.PORT || 3000

/*
console.log(__dirname)
console.log(__filename)

*/

console.log('seda')

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//console.log(path.join(__dirname, '../public'))

// Setup hadlesbars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static page location
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Merhaba',
        name: 'sed'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'Nedir',
        name: 'sed'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Yardım',
        message: 'Nasıl yardımcı olabilirim?',
        name: 'sed'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'Üzgünüz',
        errorMessage: 'Bir şey bulamadık'
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
      return  res.send({
            error: 'Bir şey aramalısın'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })

})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Bir yer ismi yazmalısınız'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if(error){
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
    
        })
    })

    
})

//match anything that hasnt match before
app.get('*',(req, res) => {
    res.render('404',{
        title: 'Üzgünüz',
        errorMessage: 'burada bişey bulamadık'
    })
})



//bunu yazınca index direkt gelir, boş endpoint gereksiz kalır

//get the resource of a url
/*
app.get('',(req, res) => {
    //send sometyhing to requester
    res.send('<h1>Bonjour</h1>')
})

app.get('/help', (req, res) => {
    res.send([{
        name:'seda',
        age: 27
    },{
        name:'robin'
    }])
})


app.get('/about', (req, res) => {
    res.send('')
})
*/


//to start the server 
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

//for changes you have to restart the server
//nodemon kullnıaoyruz bu yüzden