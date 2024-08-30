import { useState, useEffect } from "react";


import axiosInstance from '../../tools/axiosInstance';
import Map from '../../components/MapComponent/Map';
import { Box } from '@chakra-ui/react';


export default function HomePage({ user }) {
  const [sortOrderForDelivery, setSortOrderForDelivery] = useState();
  const [orderInDelivery, setOrderInDelivery] = useState();

  useEffect(() => {
    axiosInstance.get(`${import.meta.env.VITE_API}/order`).then((res) => {
      setOrderInDelivery(res.data);
      const sortOrder = res.data.filter((el) => el.status === 'available');
      setSortOrderForDelivery(sortOrder);
    });
  }, []);
  console.log(sortOrderForDelivery);
  return (
    <Box m='0 auto' w={'700px'} h={'600px'}>
      <Map
        setOrderInDelivery={setOrderInDelivery}
        user={user}
        sortOrderForDelivery={sortOrderForDelivery}
        setSortOrderForDelivery={setSortOrderForDelivery}
      />
      {/* <MapOrderModal isOpen={isOpen} onClose={onClose} /> */}
    </Box>
  );
}
