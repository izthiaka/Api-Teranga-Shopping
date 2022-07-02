const express = require("express")
const dotenv = require("dotenv")
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const create = require("express-handlebars").create


dotenv.config()
const PORT = process.env.PORT || 5000


const app = express()
// https://github.com/express-handlebars/express-handlebars
const hbs = create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

// setting up the database
const DatabaseAdapter = require("./services/Database/databaseAdapter").default
const database = new DatabaseAdapter()
database.connectDatabase()


// controllers for Routes
const ROLE_HANDLER = require("./core/roles/roles.routehandler").router


// seeders
const RoleSeeder = require('./services/Database/seeders/roles/roles.seeder.controller').default;


//=========== FOR THE DOCUMENTATION WITH SWAGGER
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'ExpressJS API for SUBITO TAXI',
        description: "API done for the migration from Laravel to NodeJS/ExpressJS ",
        version: '2.0.0',
    },
    servers: [
        {
            url: `http://localhost:${PORT}/api/v2`,
            description: 'Development server',
        },
    ],
}

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./api_documentation/*.yaml', './api_documentation/*.json'],
}

const swaggerSpec = swaggerJSDoc(options)

class Server {

    async start() {
        app.listen(PORT, async (err) => {

            if (err) console.log("Error in server setup")
            console.log(`listening on PORT ${PORT}`)

            this.initRoutes()
        
            await new RoleSeeder().seed()
                .then((value) => {
                console.log(value)
            })
        
        })
    }

    initRoutes() {
        // route par defaut
        app.use(express.json())
        app.use("/api/v1/roles", ROLE_HANDLER)

        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    }
}


new Server().start();