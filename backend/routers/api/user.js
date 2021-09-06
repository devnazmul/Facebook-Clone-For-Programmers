
const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const router = express.Router();

const User = require('../../models/User');


/*  
    @ route   /routers/api/user/register
    @ desc    User Registration
    @access   Public
*/
router.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec(); // Find User By Email.
    if (user) { // If User IS Matched.
      res.status(400).json({ 'message': 'Already have an account with this email!' });
    } else {  // If No User Exist.
      const hasedPassword = await bcrypt.hash(req.body.password, 10); // Hashing Password.
      const newUser = new User({  // Create Net User Obj.
        name: req.body.name,
        email: req.body.email,
        password: hasedPassword,
        avatar: gravatar.url(req.body.email, { s: '100', r: 'x', d: 'retro' }, true) // Grab The Avatar From Email.
      });
      newUser.save().then( // Save New User Obj To DB.
        res.status(200).json({ 'message': 'User Resistration Successfully....' })
      )
    }
  } catch (error) {  // If Anything Wrrong.
    res.status(500).json(error);
  }

});
/*  
    @ route   /routers/api/user/login
    @ desc    User Login
    @access   Public
*/
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email }); //Find User Is Available Or Not.
  if (user) { // If User Founded.
    const isAuthenticated = await bcrypt.compare(req.body.password, user.password); // Compare Password Id Authenticated Or Not.
    if (isAuthenticated) { // If User Is Authenticated.
      let token = jwt.sign({ //Creating User JWT.
        userId: user._id,
        userName: user.name
      }, process.env.JWT_SECRET, { expiresIn: '2 days' });
      res.status(200).json({ // Sending JWT To User.
        'token': token,
        'message': 'Authentication Done!'
      });
    } else { // If User Is Unauthenticated.
      res.status(401).json({ 'message': 'Authentication Failed! .' });
    }
  } else { // If User Not Found.
    res.status(401).json({ 'message': 'Authentication Failed! .' });
  }
});









module.exports = router; //Export Route.