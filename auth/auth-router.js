const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model.js')
const secrets = require('../config/secrets.js')

// REGISTER
router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

   Users.add(user)
   .then(newUser => {
    
    const token = generateToken(newUser);

    res.status(201).json({
      message: `Welcome ${
        user.username
      }! You have been successfully registered!`,
      newUser,
      token
    });
  })
     .catch(error => {
       res.status(500).json(error)
     })
});

// LOGIN
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        
        // TOKEN
        const token = generateToken(user)

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


// GENERATING TOKEN
function generateToken(user) {
  const payload = {
     // subject is normally the user's id (who/what the token describes)
     subject: user.id, //translates into the "sub" property on the token
     username: user.username,
  }
  const options = {
    expiresIn: '8h'
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}


module.exports = router;
