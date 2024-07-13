module.exports = (req, res, next) => {
  const { id } = req.params;

  if (Number.isNaN(+id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  return next();
};
