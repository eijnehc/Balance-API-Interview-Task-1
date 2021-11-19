import { useQuery } from 'react-query';

import { usersBalanceQuery } from '../queries';

export function useUsersBalanceQuery() {
  const { isLoading, error, data } = useQuery(
    ['usersBalance'],
    () => usersBalanceQuery(),
    {
      retry: false,
    }
  );

  return { isLoading, error: error as Error, data };
}
