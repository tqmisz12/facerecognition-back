import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.listen(3000, () => {
    console.log('app is running')
})

app.get('/', (req, res) => {
    res.send(database.users)
})

//signin => post success/fail
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'John@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'Sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'John@gmail.com'
        }
    ]
}
app.post('/signin', (req, res) => {
    // bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
    //     // result == true
    // });
    // bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
    //     // result == false
    // });

    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0])

    }
    else {
        res.status(400).json('error log in')
    }
})

//signup => post user

const saltRounds = 10;

app.post('/signup', (req, res) => {
    const { email, name, password } = req.body
    bcrypt.hash(password, saltRounds, function (err, hash) {
        console.log(hash)
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

//profile/:userid -> get user

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            return res.json(user)
        }
    })
    if (!found) {
        res.status(404).json('no such user')
    }
})

//image => put user

app.put('/image', (req, res) => {
    const { id } = req.body
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

// bcrypt password

