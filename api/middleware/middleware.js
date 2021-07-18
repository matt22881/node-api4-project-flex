const Users = require('./../users/users-model')

module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePostId,
    validateUserPost,
    validatePost
}

function logger(req, res, next) {
    // DO YOUR MAGIC
    const newTime = new Date()
    const timestamp = newTime.toLocaleString()
    console.log(`[${timestamp}]: ${req.method} called to ${req.url}`)
    console.log('\n --- Start Body ---\n', req.body, '\n --- End Body --- \n')
    next()
}

function validateUserId(req, res, next) {
    // DO YOUR MAGIC
    Users.getById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "user not found" })
            } else {
                req.user = user
                console.log(`Success! req.user set to ${user.name}`)
                next()
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error validating the id', error: err })
        })
}

function validateUser(req, res, next) {
    // DO YOUR MAGIC
    if (!req.body.name || req.body.name.length === 0) {
        res.status(400).json({ message: "missing required name field" })
    } else next()
}

function validatePostId(req, res, next) {
    Posts.getById(req.params.id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: "invalid post id" })
            } else {
                req.post = post
                console.log(`Success! req.post set to ${post.text}`)
                next()
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error validating the post', error: err })
        })
}

function validateUserPost(req, res, next) {
    // DO YOUR MAGIC
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "missing post data" })
    } else {
        if (!req.body.text) {
            res.status(400).json({ message: "missing required text field" })
        } else next()
    }
}

function validatePost(req, res, next) {
    // DO YOUR MAGIC
    if (!req.body.user_id || !req.body.text || req.body.user_id.length === 0 || req.body.text.length === 0) {
        res.status(400).json({ message: "missing post data" })
    } else next()
}

// do not forget to expose these functions to other modules