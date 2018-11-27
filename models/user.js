const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });

UserSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.statics.authenticate = async function(email, password) {
  // find user by email
  const user = this.find({ email: email }).limit(1).lean();
  if(user.lenth == 0) {
    return Promise.reject(`User not found`);
  }
  
  // compare passwords
  const match = await bcrypt.compare(password, user[0].password);
  if(!match) {
    return Promise.reject(`Invalid password`);
  }
};

module.exports = mongoose.model('User', UserSchema);