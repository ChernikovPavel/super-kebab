import { useState, useEffect } from "react";


import axiosInstance from '../../tools/axiosInstance';
import Map from '../../components/MapComponent/Map';
import { Box } from '@chakra-ui/react';
// import MapForm from '../../components/MapComponent/MapForm';
// import OrderModal from '../../components/Modals/OrderModal';
// import MapOrderModal from '../../components/Modals/MapOrderModal';

export default function HomePage({ user }) {
  // const [coordinates, setCoordinates] = useState();
  const [sortOrderForDelivery, setSortOrderForDelivery] = useState();
  const [orderInDelivery, setOrderInDelivery] = useState();

  useEffect(() => {
    axiosInstance.get(`${import.meta.env.VITE_API}/order`).then((res) => {
      setOrderInDelivery(res.data);
      const sortOrder = res.data.filter((el) => el.status === 'available');
      setSortOrderForDelivery(sortOrder);
    });
  }, []);

  return (
    <Box m='0 auto' w={'700px'} h={'600px'}>
      <Map
        setOrderInDelivery={setOrderInDelivery}
        user={user}
        sortOrderForDelivery={sortOrderForDelivery}
      />
      {/* <MapOrderModal isOpen={isOpen} onClose={onClose} /> */}
    </Box>
  );
}
