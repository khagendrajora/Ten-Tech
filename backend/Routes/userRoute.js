const express = require("express");
const {
  userRegister,
  login,
  signOut,
  forgetPwd,
  resetPwd,
  userDetail,
  userList,
  userUpdate,
  deleteUser,
} = require("../Controllers/userController");
const router = express.Router();

router.post("/userRegister", userRegister);
router.post("/login", login);
router.post("/signout", signOut);
router.post("/forgetpwd", forgetPwd);
router.put("/resetpassword/:token", resetPwd);
router.get("/userdetail/:id", userDetail);
router.get("/userlist", userList);
router.put("/userupdate/:id", userUpdate);
router.delete("/userdelete/:id", deleteUser);

module.exports = router;
