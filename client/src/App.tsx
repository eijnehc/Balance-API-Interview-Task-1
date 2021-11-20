import { FC, useState } from 'react';
import styled from 'styled-components';

import {
  useUsersBalanceQuery,
  userTotalAssetsQuery,
  usersBalanceQuery,
} from './apis';

export const App: FC = () => {
  const { data, isLoading, error } = useUsersBalanceQuery();
  const [currentUser, setCurrentUser] = useState('');
  const [userBalance, setUserBalance] = useState('');

  const fetchUserTotalBalance = async (user: string) => {
    if (currentUser === user) {
      return usersBalanceQuery;
    }
    setCurrentUser(user);
    const key = user.split('-')[1];

    try {
      const res = await userTotalAssetsQuery(Number(key));
      setUserBalance(res);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const renderedResults = data?.map((userBalance) => {
    return (
      <tr
        key={userBalance.user}
        onClick={() => fetchUserTotalBalance(userBalance.user)}
      >
        <td>{userBalance.user}</td>
        <td>{userBalance.BTC ? `${userBalance.BTC} BTC` : <>&mdash;</>}</td>
        <td>{userBalance.ETH ? `${userBalance.ETH} ETH` : <>&mdash;</>}</td>
      </tr>
    );
  });

  return (
    <Container>
      <Wrapper>
        <Table>
          <thead>
            <tr>
              <th>User</th>
              <th>BTC Amount</th>
              <th>ETH Amount</th>
            </tr>
          </thead>
          <tbody>{renderedResults}</tbody>
        </Table>
        {userBalance && <UserBalanceWrapper>{userBalance}</UserBalanceWrapper>}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: relative;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 80%;
  height: 80%;
  margin: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  background-color: white;
  width: 100%;
  text-align: center;
  color: var(--primary-color-700);
  margin-bottom: 50px;

  thead > tr {
    height: 40px;
    font-size: 24px;
    color: var(--primary-color-700);
    background-color: var(--primary-color-900);
  }

  tbody tr {
    height: 60px;
    font-size: 20px;
    padding: 16px 24px;
    border-bottom: 3px solid var(--primary-color-500);
    cursor: pointer;

    :hover {
      background-color: var(--primary-color-300);
    }
  }
`;

const UserBalanceWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;

  //Note: Inspired by Josh Comeau Shadow Palette generator
  box-shadow: var(--shadow-elevation-medium);
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid grey;
  border-radius: 50%;
  border-top-color:hsl(208, 96%, 57%);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }

`;

export default App;
