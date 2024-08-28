const router = require('express').Router();
// const { Task } = require('../../db/models');
const { verifyAccessToken } = require('../../middlewares/verifyToken');

// router
//   .get('/', async (req, res) => {
//     try {
//       const entries = await Task.findAll();
//       res.json(entries);
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(400);
//     }
//   })
//   .post('/', verifyAccessToken, async (req, res) => {
//     const { name, description } = req.body;
//     const { user } = res.locals;

//     try {
//       const entry = await Task.create({
//         name,
//         description,
//         userId: user.id,
//       });
//       res.json(entry);
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(400);
//     }
//   })
//   .delete('/:id', verifyAccessToken, async (req, res) => {
//     const { id } = req.params;
//     const { user } = res.locals;
//     try {
//       const task = await Task.findOne({ where: { id } });
//       if (task.userId === user.id) {
//         task.destroy();
//         res.sendStatus(200);
//       } else {
//         res.status(400).json({ message: 'У вас нет прав на удаление' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(400);
//     }
//   });

// module.exports = router;
