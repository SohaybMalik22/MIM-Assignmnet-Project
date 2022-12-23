const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors');
const url  = 'mongodb://localhost:27017/mim'

mongoose.connect(url, {useNewUrlParser: true});

const con = mongoose.connection

const app = express()

app.use(cors())

app.set('port', process.env.APP_PORT || 3000);
app.set('host', process.env.APP_HOST || 'localhost')

con.on('open', () => {
    console.log('conneted...')
})

app.use(express.json())


app.use('/auth', require("./routes/auth"))

app.listen(app.get('port'), () => console.log(`Application started on port ${app.get('port')} \n\Link: http://${app.get('host')}:${app.get('port')}`));
