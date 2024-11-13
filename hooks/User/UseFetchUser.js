
import { useState, useEffect } from 'react';
import { getRequest } from './../ApiHandler';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await getRequest('auth/users');
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { users, setUsers, loading, error,fetchData };
};

export default useFetchUsers;
