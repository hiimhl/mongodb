const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //salt의 길이

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

const User = mongoose.model("User", userSchema);

// export
module.exports = { User };
