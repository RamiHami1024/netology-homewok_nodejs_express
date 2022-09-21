const express = require('express')
const router = express.Router()
const booksUploader = require('../middleware/booksUploader')
const fs = require('fs')
const {v4: uuid} = require('uuid')

router.get('/users', (req, res) => {
    res.status(200).json(store.users)
})

router.post('/user/login', (req, res) => {
    const {mail} = req.body
    const newUser = new User(store.users.length + 1, mail)
    store.users.push(newUser)

    res.status(201).json(newUser)
})

router.get('/books', (req, res) => {
    if (store.books.length) {
        res.status(200).json(store.books)
    } else {
        res.status(200).json('Не создано ни одной книги')
    }
})

router.get('/books/:id', (req, res) => {
    const {id} = req.params
    
    store.books.forEach(item => {
        if (item.id === id) {
            res.status(201).json(item)
        }
    })

    res.status(404).json('Такой книги нет.')
})

router.post('/books', booksUploader.single('book'), (req, res) => {
    if (req.body) {
        const path = req.file.path
        const fileName = req.file.filename
        // const book = fs.readFileSync(path, {encoding: 'utf-8', flag: 'r'})
        console.log(req.file)
        const book = JSON.parse(req.body.data)
        
        const newBook = new Book(
            book.title,
            book.description,
            book.authors,
            book.favorite,
            book.fileCover,
            fileName,
            path
        )
        // console.log(newBook)
        store.books.push(newBook)
        console.log(store.books)
        res.json(newBook)

        return
    }

    res.json({
        error: 'newBook'
    })
})

router.get('/books/:id/download', (req, res) => {
    const {id} = req.params

    store.books.forEach((item) => {
        if (item.id === id) {
            res.download(item.fileBook)
        } 
    })
})

router.put('/books/:id', (req, res) => {
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

router.delete('/books/:id', (req, res) => {
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
        fileBook,
        id = uuid()
    ) {
        this.id = id || ''
        this.title = title || ''
        this.description = description || ''
        this.authors = authors || ''
        this.favorite = favorite || ''
        this.fileCover = fileCover || ''
        this.fileName = fileName || ''
        this.fileBook = fileBook || ''
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

module.exports = router