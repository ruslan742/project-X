module.exports = (fields) => (req, res, next) => {
  console.log(req.body);
  if (!fields.every((el) => !!req.body[el])) {
    return res.status(400).json({ message: 'All fields required' });
  }

  return next();
};
