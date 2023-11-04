import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const { loggedIn } = useSelector((store) => store.authenticationSlice);
  if (loggedIn == false) navigate('/login');

  return (
    <div>
      <>BlogForm</>
      <>BlogList</>
    </div>
  );
};

export default Index;
