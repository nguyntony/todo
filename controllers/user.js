const { layout } = require("../utils")
const bcrypt = require("bcryptjs")
const { User } = require("../models")

const signUp = (req, res) => {
    // let { message } = req.session

    // if (!message) {
    //     message = ""
    // } // this also does not work sadly..

    res.render("user/form", {
        ...layout,
        locals: {
            title: "Sign Up"
        }
    })
}

const login = (req, res) => {
    // let { message } = req.session

    // if (!message) {
    //     message = ""
    // }

    res.render("user/form", {
        ...layout,
        locals: {
            title: "Login"
        }
    })
}

const processSignUp = async (req, res) => {
    let { username, password } = req.body
    username = username.toLowerCase().trim()
    // will add more validations later, look into sqlize validators for this

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    try {
        const newUser = await User.create({
            username,
            hash
        })
        res.redirect(`${req.baseUrl}/login`)
    } catch (err) { // this does not work, will need to come back to fix this.
        if (err.name === "SequelizeUniqueConstraintError") {
            res.render("user/errorForm", {
                ...layout,
                locals: {
                    title: "Sign Up",
                    errorMsg: "Username has already been taken."
                }
            })
            // res.redirect(`${req.baseUrl}/signup`)
        }
    }
}

const processLogin = async (req, res) => {
    // going to go with the post request
    const { username, password } = req.body
    const user = await User.findOne({
        where: {
            username
        }
    })

    // if (user) {
    //     const isValid = bcrypt.compareSync(password, user.hash)
    //     if (isValid) {
    //         req.session.user = { username, id: user.id } // we're setting an id that will equal to the user's id and it is user because we made the object equal to user and we access the id which is the primary key.
    //         req.session.save(() => {
    //             res.redirect("/member")
    //         })
    //     } else {
    //         // req.session.message = "Username or Password is incorrect."
    //         res.redirect(`${req.baseUrl}/login`)
    //         // res.render("user/form", {
    //         //     ...layout,
    //         //     locals: {
    //         //         title: "Login",
    //         //         message: "Username or Password is incorrect."
    //         //     }
    //         // })
    //     }
    // } else {
    //     // req.session.message = "No match, try signing up!"
    //     res.redirect(`${req.baseUrl}/signup`)
    //     // res.render("user/form", {
    //     //     ...layout,
    //     //     locals: {
    //     //         title: "Sign Up",
    //     //         message: "No match, please sign up!"
    //     //     }
    //     // })
    // }

    if (user && bcrypt.compareSync(password, user.hash)) {
        req.session.user = { username, id: user.id }
        req.session.save(() => {
            res.redirect("/member")
        })
    } else {
        res.render("user/errorForm", {
            ...layout,
            locals: {
                title: "Log In",
                errorMsg: "Username or password is incorrect."
            }
        })
    }
}

module.exports = {
    signUp,
    login,
    processSignUp,
    processLogin
}