import chai from 'chai';

import { calculateTotalValue } from './src/server.js';

const { assert } = chai;
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

describe('UserBalances', async () => {
  it('Assuming BTC is 60000 and ETH is 3000, user has currency in 2 markets, 0.5 BTC and 2 ETH return 36000', async () => {
    let result = await calculateTotalValue(userBalances['user-1'], 60000, 3000);

    assert.equal(result, 36000);
  });
});

describe('UserBalances', async () => {
  it('Assuming BTC is 60000, user has currency in 1 market, 0.1 BTC return 6000', async () => {
    let result = await calculateTotalValue(userBalances['user-2'], 60000, 3000);

    assert.equal(result, 6000);
  });
});
