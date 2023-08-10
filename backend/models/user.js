const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { regex } = require('../utils/regex-pattern');
const { UnauthorizedErr } = require('../middlewares/unauthorizedErr');

const { JWT_SECRET, NODE_ENV } = process.env;
console.log(JWT_SECRET, NODE_ENV)

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  avatar: {
    type: String,
    validate: {
      validator: (str) => regex.test(str),
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (str) => isEmail(str),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
userScheme.statics.findUserByCredentials = function (res, next, email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(new UnauthorizedErr())
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (isValid) {
            const token = jwt.sign(
              { _id: user._id },
              NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
              { expiresIn: '7d' },
            );
            res.send({ token });
          }
          next(new UnauthorizedErr());
        });
    })
    .catch(next);
};
const User = mongoose.model('user', userScheme);

module.exports = User;
