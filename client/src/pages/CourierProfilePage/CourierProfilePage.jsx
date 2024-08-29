import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import Form from '../../components/Form/Form';
import styles from './CourierProfilePage.module.css';
import axiosInstance from '../../tools/axiosInstance';
import { Heading } from '@chakra-ui/react';
import OrderCard from '../../components/Cards/OrderCard';

export default function CourierProfilePage({user}) {
  const [orders, changeOrders] = useState([]);
console.log(user);

  useEffect(() => {
    axiosInstance.get('api/order/').then((res) => changeOrders(res.data));
  }, []);

return (

<div className={styles.wrapper}>  
<Heading as='h3' size='xl'>
Личный кабинет курьера
</Heading> <br/><br/>
<Flex>
      {orders.map((el) => (
        <OrderCard key={el.id} element={el}></OrderCard>
      ))}
    </Flex>    
  </div>
);
}
