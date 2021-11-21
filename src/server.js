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
  try {
    const res = await fetch(`https://www.bitstamp.net/api/v2/ticker/${ticker}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function calculateTotalValue(
  userBalance,
  BTCLastPrice,
  ETHLastPrice
) {
  let totalAssetValue = 0;

  for (const key in userBalance) {
    if (key === 'BTC') {
      totalAssetValue += userBalance[key] * BTCLastPrice;
    } else {
      totalAssetValue += userBalance[key] * ETHLastPrice;
    }
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
    const BTCPrice = await tickerQuery('BTCUSD');
    const ETHPrice = await tickerQuery('ETHUSD');
    const totalAssetValue = await calculateTotalValue(
      userBalance,
      BTCPrice.last,
      ETHPrice.last
    );
    res
      .status(200)
      .send(
        `The total asset value for ${key} is $${totalAssetValue.toFixed(2)} USD`
      );
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to fetch ${key} total asset value`);
  }
});

app.get('/api/v1/users', (req, res) => {
  res.status(200).json(userBalances);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
