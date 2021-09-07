const express = require('express');
const { userRegistration, userLogin } = require('../../controller/user');
const passport = require('passport');

const router = express.Router();

/*  
    @ route   /routers/api/user/register
    @ desc    User Registration
    @access   Public
*/
router.post('/register', async (req, res) => {
  try {
    userRegistration(req, res)
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
  try {
    userLogin(req, res);
  } catch (error) {
    res.status(401).json({ "message": "Authentication failed!" })
  }
});


/*  
    @ route   /routers/api/user/secure
    @ desc    Security Test
    @access   Private
*/
router.get('/secure', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    res.json({msg: 'success'})
  } catch (error) {
    res.status(401).json({ "message": "Authentication failed!" })
  }
});

module.exports = router; //Export Route.