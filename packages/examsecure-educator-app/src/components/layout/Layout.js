import React from 'react';
import NavBar from './NavBar';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const Layout = ({ children }) => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  return (
    <>
      <Loading show={isLoading} />
      <NavBar />
      <div className="content-wrapper">{children}</div>
    </>
  );
};

export default Layout;
