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
    const user = await User.findOne({ email: req.body.email }).exec()
    if (user) {
      res.status(400).json({ 'message': 'Already have an account with this email!' })
    } else {
      const hasedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hasedPassword,
        avatar: gravatar.url(req.body.email, { s: '100', r: 'x', d: 'retro' }, true)
      })
      newUser.save().then(
        res.status(200).json({ 'message': 'User Resistration Successfully....' })
      )
    }
  } catch (error) {
    res.status(500).json(error)
  }

})


/*  
    @ route   /routers/api/user/login
    @ desc    User Login
    @access   Public
*/
router.post('/login', async (req, res) => {
  //Find User Is Available Or Not
  const user = await User.findOne({ email: req.body.email });

  if (user) { // If User Founded.
    // Compare Password Id Authenticated Or Not.
    const isAuthenticated = await bcrypt.compare(req.body.password, user.password);
    if (isAuthenticated) { // If User Is Authenticated.
      //Creating User JWT
      let token = jwt.sign({
        userId: user._id,
        userName: user.name
      }, process.env.JWT_SECRET, {
        expiresIn: '2 days'
      });

      res.status(200).json({ // Sending Token
        'token' : token,
        'message': 'Authentication Done!' 
      });

    } else { // If User Is Unauthenticated.
      res.status(401).json({ 'message': 'Authentication Failed! .' });
    }

  } else { // If User Not Found.
    res.status(401).json({ 'message': 'Authentication Failed! .' });
  }
});

module.exports = router;