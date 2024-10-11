const express = require('express')



const googleauthRouter = require('./google')
const userRouter =  require('./user')
const courseRouter = require('./course')

module.exports = function routes(app){
    app.use(express.json())
    app.use(googleauthRouter)
    app.use("/api", userRouter )
    app.use("/api", courseRouter)
}