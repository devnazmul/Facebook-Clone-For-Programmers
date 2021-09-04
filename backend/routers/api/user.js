const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');

const userRouter = express.Router();

const User = require('../../models/User');

/*  
    @ route   /routers/api/user/register
    @ desc    User Registration
    @access   Public
*/
userRouter.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).exec()
    .then((user) => {
      if (user) {
        res.status(400).json({ message: 'Already have an account with this email!' })
      } else {
        bcrypt.hash(req.body.email, 10).then(hash => {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            avatar: gravatar.url(req.body.email, {s: '100', r: 'x', d: 'retro'}, true)
          })
          newUser.save().then(() => {
            res.status(200).json({ message: 'User Resistration Successfully....' })
          }).catch(() => {
            res.status(400)
          })
        })
          .catch((err) => console.log(err))
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = userRouter;