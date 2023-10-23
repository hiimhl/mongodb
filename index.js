const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const config = require("./config/key");
const cookieParser = require("cookie-parser");

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  //client에서 회원 가입을 할 때 필요한 정보들을 가져오면
  //해당 정보들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  //save()는 몽고db 메소드
  user
    .save()
    .then((userInfo) => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => res.json({ success: false, err }));
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }) //
    .then((userInfo) => {
      // 요청된 이메일이 데이터베이스에 존재하는지 확인.
      if (!userInfo) {
        return res.json({
          loginSuccess: false,
          message: "존재하지 않는 이메일입니다.",
        });
      }
      // 이메일이 데베에 있다면 비밀번호가 맞는지 확인
      userInfo.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 일치하지 않습니다.",
          });
        }

        // 비밀번호도 일치한다면 토큰을 생성
        userInfo.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          // 토큰 저장하기 - 쿠키 사용
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    })
    .catch((err) => res.status(400).send(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
