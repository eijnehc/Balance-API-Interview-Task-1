export interface apiUsersBalance {
  [keys: string]: {
    BTC: string;
    ETH: string;
  };
}

export interface UsersBalance {
  user: string;
  BTC: number;
  ETH: number;
}
