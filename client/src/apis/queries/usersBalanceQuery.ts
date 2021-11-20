import { UsersBalance, apiUsersBalance } from '../interfaces';

function formatUsersBalance(usersBalance: apiUsersBalance): UsersBalance[] {
  const formattedData = Object.keys(usersBalance).map((user) => {
    const BTCBalance = usersBalance[user].BTC
      ? Number(usersBalance[user].BTC)
      : 0;
    const ETHBalance = usersBalance[user].ETH
      ? Number(usersBalance[user].ETH)
      : 0;

    return {
      user,
      BTC: BTCBalance,
      ETH: ETHBalance,
    };
  });

  return formattedData;
}

export async function usersBalanceQuery(): Promise<UsersBalance[]> {
  const res = await fetch('/api/v1/users');

  return res.json().then(formatUsersBalance);
}

export async function userTotalAssetsQuery(user: number): Promise<string> {
  const res = await fetch(`/api/v1/users/${user}`);

  return res.text();
}
