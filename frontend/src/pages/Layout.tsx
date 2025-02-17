import api from '../api/apiClient';

import React from 'react'

const Layout: React.FC = () => {

  const sendData = async () => {
    const response = await api.post('/auth/register', {
      name: 'test',
      email: 'testetes@gmail.com',
      password: 'testtest1212',
      password_confirmation: 'testtest1212'
    });

    console.log(response.data);
  }


  return (
    
    <>
    <button onClick={sendData}>CLICK</button>
    
    </>
  )
}

export default Layout