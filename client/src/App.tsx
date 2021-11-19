import { FC } from 'react';
import styled from 'styled-components';

import { useUsersBalanceQuery } from './apis';

export const App: FC = () => {
  const { data, isLoading, error } = useUsersBalanceQuery();

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

  const renderedResults = data?.map((userBalance, idx) => {
    return (
      <tr key={`userBalance.user-${idx}`}>
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
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: relative;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
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
  color: hsl(208, 96%, 57%);
  margin-bottom: 50px;

  thead > tr {
    height: 40px;
    font-size: 24px;
    color: hsl(208, 96%, 57%);
    background-color: hsl(212, 40%, 20%);
    cursor: pointer;
  }

  tbody tr {
    height: 60px;
    font-size: 20px;
    padding: 16px 24px;
    border-bottom: 3px solid hsl(200, 100%, 64%);
    :hover {
      background-color: lightblue;
    }
  }
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
