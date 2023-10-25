const { User } = require("../models/User");

//인증 처리를 하는 곳
let auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;
  // 토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 유저가 없으면 인증 X
    if (!user) return res.json({ isAuth: false, error: true });

    // 유저가 있으면 인증 O
    req.token = token; // req안에 정보를 저장하여 함수로 전달 되었을 때 사용가능
    req.user = user;
    next(); // 미들웨어에서 탈출
  });
};

module.exports = { auth };
