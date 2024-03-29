import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user and get token
// @route   POST /api/users/login
// @acess   Public
const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email: email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email address or password')
    }
})

// @desc    Register a new user
// @route   POST /api/users   
// @acess   Public
const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email: email})

    if(userExists){
        res.status(400);
        throw new Error('user already exists')
    }

    const user = new User({
        name,
        email,
        password
    })
    
    await user.save()
    
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user.id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    get user profile
// @route   GET /api/users/profile
// @acess   Private
const getUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)

    if(user ){
        res.json({
            _id: user._id,
            name: user.email,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @acess   Private
const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)

    if(user ){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    get all users
// @route   GET /api/users
// @acess   Private/Admin
const getUsers = asyncHandler(async (req,res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc    get user by id
// @route   GET /api/users/:id
// @acess   Private/Admin
const getUserById = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id).select('-password')
    res.json(user)
})

// @desc    Update user
// @route   PUT /api/users/:id
// @acess   Private/Admin
const updateUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id)

    if(user ){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @acess   Private/Admin
const deleteUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id)

    if(user){
        await user.remove()
        res.json(user)

    }else{
        res.status(404)
        throw new Error('User not found')
    }
    res.json(user)
})
export {authUser,registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}