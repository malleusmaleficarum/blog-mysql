import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            <img alt='logo' src={Logo} />
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to='/?cat=art'>
            <h5>Art</h5>
          </Link>
          <Link className='link' to='/?cat=technology'>
            <h5>Technology</h5>
          </Link>
          <Link className='link' to='/?cat=science'>
            <h5>Science</h5>
          </Link>
          <Link className='link' to='/?cat=cinema'>
            <h5>Cinema</h5>
          </Link>
          <Link className='link' to='/?cat=design'>
            <h5>Design</h5>
          </Link>
          <Link className='link' to='/?cat=food'>
            <h5>Food</h5>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className='link' to='/login'>
              Login
            </Link>
          )}
          <span className='write'>
            <Link className='link' to='/write'>
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
