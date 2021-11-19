import chai from 'chai';

import { calculateTotalValue } from './server.js';

const { assert } = chai;
const userBalance = { BTC: '0.5', ETH: '2' };

describe('UserBalances', async () => {
  it('Assuming BTC is 60000 and ETH is 3000, user has 0.5 BTC and 2 ETH return 36000', async () => {
    let result = await calculateTotalValue(userBalance, 60000, 3000);

    assert.equal(result, 36000);
  });
});
