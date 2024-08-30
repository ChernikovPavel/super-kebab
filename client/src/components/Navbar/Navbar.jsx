import { Box, Button, Flex, Image } from '@chakra-ui/react';
import axiosInstance, { setAccessToken } from '../../tools/axiosInstance';

import { Link, NavLink, useNavigate } from 'react-router-dom';

function NavButton({ children, to }) {
  return (
    <Link to={to}>
      <Button className="btn-navbar" colorScheme="orange">
        {children}
      </Button>
    </Link>
  );
}

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/auth/logout`
    );
    if (response.status === 200) {
      setUser({});
      setAccessToken('');
      navigate('/');
    }
  };
  const Links = ['Dashboard', 'Projects', 'Team'];

  return (
    <>
      <Box
        className="navbar"
        height="3.75em"
        padding=".6em"
        rounded="sm"
      >
        <Flex justifyContent="space-between" margin="auto 0" padding="0 1em">
          <Flex >
            <Image
              src="/doel.svg"
              margin="auto"
              marginLeft="0px"
              marginRight="25px"
              boxSize="30px"
            ></Image>
            <NavButton to="/">Home</NavButton>
          </Flex>
          <Box>
            {Object.keys(user).length ? (
              <>
                <Button colorScheme="orange" onClick={logoutHandler}>Unlog</Button>
                <NavButton to="/ProfileSettingsPage">LK</NavButton>
                <NavButton to="/CourierProfilePage">LK</NavButton>
                <NavButton to="/CustomerProfilePage">LK</NavButton>
              </>
            ) : (
              <>
                <NavButton to="/signin">Log</NavButton>
                <NavButton to="/signup">Reg</NavButton>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
