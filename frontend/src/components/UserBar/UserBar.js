import React, { useState, useRef, useEffect } from 'react';
import './UserBar.css';

const UserBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const userBarRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {

    const fetchCoinData = async () => {
        try {
          const userResponse = await fetch('http://localhost:3200/api/v1/users');
          const userData = await userResponse.json();
          setUserData(userData);
        } catch (error) {
          console.error('Error fetching coin data:', error);
        }
      };
  
      fetchCoinData();
    const handleWindowClick = (event) => {
      if (userBarRef.current && !userBarRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const activeUserID = localStorage.getItem('activeUserName');
    if (activeUserID) {
      setActiveUser(activeUserID);
    }
  }, [setActiveUser]);
  
  const handleUserChange = (user) => {
    //setActiveUser(user.id);
    localStorage.setItem('activeUserID', user.id);
    localStorage.setItem('activeUserName', user.username); // Guardar el ID del usuario en las cookies por 7 días
    localStorage.setItem('address', user.address)
    setIsDropdownOpen(false);
    window.location.reload();
  }

  useEffect(() => {
    if (userBarRef.current && isDropdownOpen) {
      const userBarRect = userBarRef.current.getBoundingClientRect();
      const dropdownTop = userBarRect.bottom + window.scrollY;
      const dropdownLeft = userBarRect.left + window.scrollX;

      setDropdownPosition({ top: dropdownTop, left: dropdownLeft });
    }
  }, [isDropdownOpen]);

  return (
    <div className="UserBar">
      <div className="UserBar-profile" onClick={handleDropdownToggle} ref={userBarRef}>
        <div className="UserBar-avatar">
          {/* Agrega aquí el componente o imagen del avatar */}
          <div className="UserBar-avatar-circle"></div>
        </div>
        <p className="UserBar-username">{activeUser}</p>
      </div>
      {isDropdownOpen && (
        <ul className="UserBar-dropdown" style={dropdownPosition}>
          {userData.map((user) => (
            <li key={user.username} onClick={() => handleUserChange(user)}>
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBar;
