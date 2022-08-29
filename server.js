const express = require('express');
const {v4: uuid} = require('uuid')

const app = express();

app
    .use(express.json())
    .listen(3000)

app.post('/api/user/login', (req, res) => {
    const {mail} = req.body
    const newUser = new User(store.users.length + 1, mail)
    store.users.push(newUser)

    res.status(201).json(newUser)
})

app.get('/api/users', (req, res) => {
    res.status(200).json(store.users)
})

app.get('/api/books', (req, res) => {
    if (store.books.length) {
        res.status(200).json(store.books)
    } else {
        res.status(200).json('Не создано ни одной книги')
    }
})

app.get('/api/books/:id', (req, res) => {
    const {id} = req.params

    store.books.forEach(item => {
        if (item.id === id) {
            res.status(201).json(item)
        }
    })

    res.status(404).json('Такой книги нет.')
})

app.post('/api/books', (req, res) => {
    const newBook = new Book(
        ...req.body
    )

    store.books.push(newBook)

    res.status(201).json(newBook)
})

app.put('/api/books/:id', (req, res) => {
    const {id} = req.params
    
    store.books.forEach((item, key) => {
        if (item.id === id) {
            store.books[key] = {
                ...store.books[key],
                ...req.body
            }

            res.status(201).json(store.books[key])
        }
    })

    res.status(404).json('Книга не найдена')
})

app.delete('/api/books/:id', (req, res) => {
    const {id} = req.params

    store.books.forEach((item, index) => {
        if (item.id === id) {
            store.books.splice(index, 1)

            res.status(201).json('ok')
        } 

        res.status(404).json('Книга не найдена')
    })
})

class Book {
    constructor(
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        id = uuid()
    ) {
        this.id = id || ''
        this.title = title || ''
        this.description = description || ''
        this.authors = authors || ''
        this.favorite = favorite || ''
        this.fileCover = fileCover || ''
        this.fileName = fileName || ''
    }
}

class User {
    constructor(
        id,
        mail,
    ) {
        this.id = id
        this.mail = mail
    }
}

const store = {
    books: [
        
    ],
    users: [
        {
            id: 1,
            mail: 'root@root'
        }
    ]
}