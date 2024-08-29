import { useState, useEffect } from "react";

import styles from "./HomePage.module.css";
import axiosInstance from "../../tools/axiosInstance";
import Map from '../../components/MapComponent/Map';
import { Box } from '@chakra-ui/react';
import MapForm from '../../components/MapComponent/MapForm';

export default function HomePage({ user }) {
  const [coordinates, setCoordinates] = useState();

  const [orderInDelivery, setOrderInDelivery] = useState();
  // const coordinatesToNumber = (coordinates) =>
  //   coordinates?.map((el) => Number(el));
  useEffect(() => {
    axiosInstance.get(`${import.meta.env.VITE_API}/order`).then((res) => {
      setOrderInDelivery(res.data);
      // setCoordinates(coordinatesToNumber);
    });
  }, []);

  return (
    <Box m='0 auto' w={'600px'} h={'600px'}>
      <Map orderInDelivery={orderInDelivery} />
    </Box>
  );
}
