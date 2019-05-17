const express = require('express');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const router = express.Router();

const User = require('../../models/User');
/**
 * @route   POST api/auth/register
 * @desc    Register new user
 * @access  public
 */
router.post('/register', [
  check('username')
    .custom(username => User.findOne({ username })
      .then((user) => {
        if (user) {
          return Promise.reject(new Error('Username already in use'));
        }
      }))
    .exists()
    .withMessage('Username is required'),
  check('password')
    .exists()
    .withMessage('Password is required'),
  check('passwordConfirmation')
    .exists()
    .withMessage('Password confirmation is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }

      return true;
    }),
  check('email')
    .isEmail()
    .custom(email => User.findOne({ email })
      .then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in use'));
        }
      }))
    .normalizeEmail({ gmail_remove_dots: false })
    .exists()
    .withMessage('E-mail address is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(res.status(400).json({ success: false, errors: errors.array() }));
  }

  const { username, password, email, firstname, lastname } = req.body;

  const newUser = new User({
    username,
    password,
    email,
    firstname,
    lastname
  });

  newUser.save().then(user => {
    jwt.sign(
      { id: user.id },
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  });
});

/**
 * @route   POST api/auth/login
 * @desc    Auth user
 * @access  public
 */
router.post('/login', [
  check('username')
    .exists()
    .withMessage('Username is required.'),
  check('password')
    .exists()
    .withMessage('Password is required.')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(res.status(400).json({ success: false, errors: errors.array() }));
  }

  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.json(res.status(400).json({ msg: 'User does not exist.' }));
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) throw err;

        if (!isMatch) return res.json(res.status(400).json({ msg: 'Invalid credentials.' }));

        jwt.sign(
          { id: user.id },
          config.get('jwtSecret'),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({ token, user });
          }
        );
      });
    });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
