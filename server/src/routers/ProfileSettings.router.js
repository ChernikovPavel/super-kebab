const router = require("express").Router();
const { User } = require("../../db/models");
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../../middlewares/verifyToken");

router
.get("/:id", verifyAccessToken, async(req,res)=>{
  try{
    const user = await User.findByPk(req.params.id,{
      attributes:['username', 'email', 'password']
    })
    if(!user){
      return res.status(404).json({message: "Нет такого пользователя"})
    }
    res.status(200).json(user);
  }
  catch(error){console.error("can't get user data",error);
    res.status(500).json({message: "failed to fetch user data"})
  }
})

.put("/:id", verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;
  const {newUsername, newEmail, newPassword, oldUsername,oldPassword,oldEmail  } = req.body;
  try {
    const user = await User.findByPk(id);
    if(!user){
      return res.status(404).json({message: "Нет такого пользователя"})
    }
    if(oldUsername && oldUsername === user.username){
      user.username = newUsername;
    }
    if(oldEmail && oldEmail === user.email){
      user.email = newEmail
    }
    if(oldPassword && newPassword){
      if(await user.comparePassword(oldPassword)){
        user.password = await user.hashPassword(newPassword);
      } else{
        return res.status(400).json({message:"Вы ввели неверный пароль"})
      }
    }
    await user.save();
    res.status(200).json(user)
    
  } catch (error) {
    console.error(error, "Изменения не сохранились");
    res.status(500);
  }
});

module.exports = router;