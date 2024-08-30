import { useState, useEffect } from "react";


import axiosInstance from '../../tools/axiosInstance';
import Map from '../../components/MapComponent/Map';
import { Box } from '@chakra-ui/react';


export default function HomePage({
  user,
  selectedOrder,
  setSelectedOrder,
  sortOrderForDelivery,
  setSortOrderForDelivery,
}) {
  const [orderInDelivery, setOrderInDelivery] = useState();
  const [remuveMap, setRemuveMap] = useState(false);

  useEffect(() => {
    axiosInstance.get(`${import.meta.env.VITE_API}/order`).then((res) => {
      setOrderInDelivery(res.data);
      const sortOrder = res.data.filter((el) => el.status === 'available');
      if (res.data) {
        setSortOrderForDelivery(sortOrder);
        setRemuveMap(true);
      }
    });
  }, []);
  console.log(sortOrderForDelivery);
  return (
    <Box m='0 auto' w={'700px'} h={'600px'} overflow='hidden'>
      <Map
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        remuveMap={remuveMap}
        setRemuveMap={setRemuveMap}
        setOrderInDelivery={setOrderInDelivery}
        user={user}
        sortOrderForDelivery={sortOrderForDelivery}
        setSortOrderForDelivery={setSortOrderForDelivery}
      />
    </Box>
  );
}
