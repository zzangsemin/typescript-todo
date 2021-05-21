const write = (req, res) => {
  res.send('write');
};

const remove = (req, res) => {
  res.send('remove');
};

module.exports = { write, remove };
