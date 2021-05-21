const write = (req, res) => {
  res.send('write');
};

const change = (req, res) => {
  res.send('change');
};

const remove = (req, res) => {
  res.send('remove');
};

module.exports = { write, remove, change };
