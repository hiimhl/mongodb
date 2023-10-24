const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //salt의 길이
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minLength: 5,
  },
  lastname: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 데이터를 저장하기 전에 비밀번호를 암호화시킴.
// next()를 사용하여 save()함수로 보냄.
// arrow function을 사용하면 error가 생김.
userSchema.pre("save", function (next) {
  const user = this;

  // 유저가 비밀번호를 변경할 때만 비밀번호를 암호화시킴.
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        // 받아온 데이터, salt, 암호화한 데이터를 전달하는 함수
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  //plainPassword === 12345, DB password = 암호화된 비밀번호
  //그래서 비밀번호를 암호화해서 DB의 비밀번호와 같은지 확인한다. (복호화는 못함.)
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);

    callback(null, isMatch); // err = null,
  });
};

// jsonwebtoken을 사용하여 token 생성하기
userSchema.methods.generateToken = function (callback) {
  var user = this;

  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // user._id + 'secretToken' = token

  user.token = token;
  user
    .save()
    .then(() => callback(null, user))
    .catch((err) => callback(err));
};

// 토큰을 이용하여 신원확인하기
userSchema.statics.findByToken = function (token, cbfn) {
  var user = this;

  // 토큰을 decode 함
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾고,
    // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인.
    user.findOne({ _id: decoded, token: token }, function (err, userInfo) {
      if (err) return cbfn(err);
      cbfn(null, userInfo);
    });
  });
};

const User = mongoose.model("User", userSchema);

// export
module.exports = { User };
