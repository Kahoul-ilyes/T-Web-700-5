const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://127.0.0.1/cryptocodex', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
const validator = require('validator')
const cryptoSchema = require('./crypto')
const Crypto = db.model('Crypto', cryptoSchema)

let bcrypt = require('bcrypt')
const SALT_FACTOR = 10


const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: {
      validator: validator.isEmail,
      message: 'Please fill a valid email address',
      isAsync: false
    }
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  currency: {
    type: String,
    default: 'EUR'
  },
  cryptos: [{ type: Schema.Types.ObjectId, ref: 'Crypto'}],
  keywords: {
    type: [String]
  }
}, {
  collection: 'users',
  timestamps: true
})

userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
  });
};

module.exports = userSchema