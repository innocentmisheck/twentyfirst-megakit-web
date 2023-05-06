const validatePage = (req, res, next) => {
    try {
        if (!req.session || !req.session.userdata || req.session.userdata.email_address == null || req.session.userdata.email_address == "" || req.session.userdata.email_address == typeof undefined) {
            res.redirect('login')
        } else {
            next()
        }
    } catch (e) {
        res.redirect('login')
    }
}

const validateJSON = (req, res, next) => {
    try {
        if (!req.session.userdata || req.session.userdata.email_address == null || req.session.userdata.email_address == "" || req.session.userdata.email_address == typeof undefined) {
            res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Session is expired or was not initiated!'
            })
        } else {
            next()
        }
    } catch (e) {
        res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Session is expired or was not initiated!'
        })
    }
}

setupSession = (app) => {
    const session = require("express-session")
    const MongoStore = require('connect-mongo')
    const RedisStore = require('connect-redis')(session)
    const redis = require('redis');

    const sessionExpiry = 5 * 60

    let redisClient = redis.createClient({
        host: '185.196.100.88',
        port: 6379,
    });

    redisClient.on('error', (error) => {

        // If the connection was lost, retry to connect after a short delay
        if (error.code === 'ECONNREFUSED') {
            console.log('Redis connection lost!')
            console.log('Trying to reconnect in 10 seconds...')
            setTimeout(() => {
                redisClient.connect();
            }, 10000);
        }
        if (error.code === 'EHOSTUNREACH') {
            console.log('Redis host not reachable!')
            console.log('Retrying connection in 10 seconds...')
            setTimeout(() => {
                redisClient = redis.createClient({
                    host: '185.196.100.88',
                    port: 6379,
                });
            }, 10000)
        }

    });

    // create a new Redis store for session data
    const redisStore = new RedisStore({
        client: redisClient,
        prefix: 'mxcore',
        ttl: sessionExpiry, // session TTL in seconds (default is 86400 seconds, or 1 day)
    });

    // const mongo = MongoStore.create({ 
    //     mongoUrl: 'mongodb+srv://mxcore:mcorewebmaster@maxiko.r0ebhp7.mongodb.net/?retryWrites=true&w=majority' 
    // })
    app.use(session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        store: redisStore,
        cookie: {
            maxAge: sessionExpiry * 1000, // 5 minutes in milliseconds
            secure: false, // or true if using HTTPS
            httpOnly: true,
        },
        rolling: true, // update expiration time with each request
    }))

    return app
}
module.exports = { validatePage, validateJSON, setupSession }