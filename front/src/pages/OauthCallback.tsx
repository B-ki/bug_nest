import { AuthContext } from '@/contexts/AuthContext';
import { userDto } from '@/dto/userDto';
import { useApi } from '@/hooks/useApi';
import useApiTest from '@/hooks/useApiTest';
import { useAuth } from '@/hooks/useAuth';
import ApiClient from '@/utils/apiAxios';
import { useContext } from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { json } from 'stream/consumers';

export function getUserApi() {
  const { data, isLoading, isError } = useApi().get('dummy2', 'https://jsonplaceholder.typicode.com/todos/1');
  if (data) {
    return data;
  }
}

function try5() {
  getUserApi();
}

export default function OauthCallback() {
  const api = useApi();
  const { settingUser } = useAuth();

  const query1 = api.get('dummy1', 'https://jsonplaceholder.typicode.com/todos/1');
  console.log(query1.data);

  if (query1.isLoading) {
	  return <div>Loading...</div>;
  }

  if (query1.isError) {
	  console.log('Error occurred');
  }

  // TRY 1 :
  //const query2 = useApi().get('dummy2', 'https://jsonplaceholder.typicode.com/todos/1');
  // TRY 2 : 
  // const query2 = useApiTest().get('https://jsonplaceholder.typicode.com/todos/1')
  // TRY 3 : 
  /*
   const fetchUserById = async () => {
     const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
     return res.json();
   }
   const query2 = useQuery("users", fetchUserById);
  */
  // TRY 4 : 
  // const userData = getUserApi();
  // TRY 5 :
  // try5();

  return (
    <div className="left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-40">
      <div>Callback page</div>
    </div>
  );
}
