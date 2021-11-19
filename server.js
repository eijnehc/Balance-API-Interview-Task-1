import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

const userBalances = {
  'user-1': {
    BTC: '0.5',
    ETH: '2',
  },
  'user-2': {
    BTC: '0.1',
  },
  'user-3': {
    ETH: '5',
  },
};

app.get('/api/v1/users/:id', (req, res) => {
  const key = `user-${req.params.id}`;
  const userBalance = { [key]: userBalances[key] };

  if (!userBalances[key]) {
    res.status(404).send('The customer with the given ID was not found');
  }
  res.json(userBalance);
});

app.get('/api/v1/users', (req, res) => {
  res.json(userBalances);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
