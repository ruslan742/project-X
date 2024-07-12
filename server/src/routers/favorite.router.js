const { Favorite } = require('../db/models');
const checkId = require('../middlewares/checkId');
const checkFields = require('../middlewares/checkFields');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const favorites = await Favorite.findAll({ order: [['updatedAt', 'DESC']] });
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  })
  .post(
    checkFields(['photo', 'priceFavorite', 'clotheFavorite']),
    async (req, res) => {
      try {
        const { photo, priceFavorite, clotheFavorite } = req.body;

        const newFavorite = await Favorite.create({
          photo,
          priceFavorite,
          clotheFavorite,
        });
        return res.json(newFavorite);
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

      const favorite = await Favorite.findByPk(id);
      if (!favorite) {
        return res.status(404).json({ message: 'Favorite not found' });
      }
      return res.json(favorite);
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  })
  .delete(checkId, async (req, res) => {
    try {
      const { id } = req.params;

      const favorite = await Favorite.findByPk(id);
      if (!favorite) {
        return res.status(404).json({ message: 'Favorite not found' });
      }

      await Favorite.destroy({ where: { id } });
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

      await Favorite.update(updateData, { where: { id } });
      const updatedFavorite = await Favorite.findByPk(id);
      res.json(updatedFavorite);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
