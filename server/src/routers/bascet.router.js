const { Bascet } = require('../db/models');
const checkId = require('../middlewares/checkId');
const checkFields = require('../middlewares/checkFields');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const bascets = await Bascet.findAll({ order: [['updatedAt', 'DESC']] });
      res.json(bascets);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  })
  .post(
    checkFields(['img', 'clothes', 'size', 'price']),
    async (req, res) => {
      try {
        const { img, clothes, size, price } = req.body;

        const newBascet = await Bascet.create({
          img,
          clothes,
          size,
          price,
        });
        return res.json(newBascet);
      } catch (error) {
        return res.status(500).json({ message: 'Server error' });
      }
    },
  );

router
  .route('/:id')
  .get(checkId, async (req, res) => {
    try {
      const { id } = req.params;

      const bascet = await Bascet.findByPk(id);
      if (!bascet) {
        return res.status(404).json({ message: 'Bascet not found' });
      }
      return res.json(bascet);
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  })
  .delete(checkId, async (req, res) => {
    try {
      const { id } = req.params;

      const bascet = await Bascet.findByPk(id);
      if (!bascet) {
        return res.status(404).json({ message: 'Bascet not found' });
      }

      await Bascet.destroy({ where: { id } });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  })
  .patch(checkId, async (req, res) => {
    try {
      const { id } = req.params;

      const updateData = {};
      for (const key in req.body) {
        if (req.body[key]) {
          updateData[key] = req.body[key];
        }
      }

      await Bascet.update(updateData, { where: { id } });
      const updatedBascet = await Bascet.findByPk(id);
      res.json(updatedBascet);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
