const express = require('express')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const Users = require('./users-model')
const Posts = require('./../posts/posts-model')

const { validateUser, validateUserId, validateUserPost } = require('./../middleware/middleware')


const router = express.Router()

router.get('/', (req, res) => {
    // RETURN AN ARRAY WITH ALL THE USERS
    Users.get()
        .then(users => {
            res.json(users)
        })
})

router.get('/:id', validateUserId, (req, res) => {
    // RETURN THE USER OBJECT
    // this needs a middleware to verify user id
    Users.getById(req.params.id)
        .then(user => {
            res.json(user)
        })
})

router.post('/', validateUser, (req, res) => {
    // RETURN THE NEWLY CREATED USER OBJECT
    // this needs a middleware to check that the request body is valid
    Users.insert({ name: req.body.name })
        .then(user => {
            res.json(user)
        })
})

router.put('/:id', validateUserId, validateUser, (req, res) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    Users.update(req.params.id, req.body)
        .then(user => {
            console.log(user)
            if (user) {
                Users.getById(req.params.id)
                    .then(user => {
                        res.json(user)
                    })
                    .catch(err => {
                        res.status(500).json({ message: 'error fetching the newly updated User' })
                    })
            } else res.status(500).json({ message: 'there was a problem updating the user' })
        })
        .catch(err => {
            res.status(500).json({ message: 'error updating the user' })
        })
})

router.delete('/:id', validateUserId, (req, res) => {
    // RETURN THE FRESHLY DELETED USER OBJECT
    // this needs a middleware to verify user id
    Users.remove(req.params.id)
        .then(() => {
            res.json(req.user)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error removing the User", error: err })
        })
})

router.get('/:id/posts', validateUserId, (req, res) => {
    // RETURN THE ARRAY OF USER POSTS
    // this needs a middleware to verify user id
    Users.getUserPosts(req.params.id)
        .then(posts => {
            res.json(posts)
        })
})

router.post('/:id/posts', validateUserId, validateUserPost, (req, res) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    Posts.insert({ user_id: req.params.id, text: req.body.text })
        .then(resp => {
            console.log('resp: ', resp)
            res.json(resp)
        })
        .catch(err => {
            res.status(500).json({ message: "Error adding post to the database.", error: err })
        })
})

// do not forget to export the router
module.exports = router