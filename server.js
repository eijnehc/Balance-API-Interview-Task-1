import express from 'express';
import fetch from 'node-fetch';

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

async function tickerQuery(ticker) {
  const res = await fetch(`https://www.bitstamp.net/api/v2/ticker/${ticker}`);

  return res.json();
}

async function calculateTotalValue(userBalance) {
  let totalAssetValue = 0;
  const BTCPrice = await tickerQuery('BTCUSD');
  const ETHPrice = await tickerQuery('ETHUSD');

  for (const key in userBalance) {
    if (key === 'BTC') {
      totalAssetValue += userBalance[key] * BTCPrice.last;
    }
    totalAssetValue += userBalance[key] * ETHPrice.last;
  }

  return totalAssetValue;
}

app.get('/api/v1/users/:id', async (req, res) => {
  const key = `user-${req.params.id}`;
  const userBalance = userBalances[key];

  if (!userBalances[key]) {
    res.status(404).send(`The user with the ID ${req.params.id} was not found`);
  }

  try {
    const totalAssetValue = await calculateTotalValue(userBalance);
    res.send(
      `The total asset value for ${key} is $${totalAssetValue.toFixed(2)} USD`
    );
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/v1/users', (req, res) => {
  res.json(userBalances);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
