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
import CourierCard from '../../components/Cards/CourierCard';

export default function CourierProfilePage({user}) {
  const [orders, changeOrders] = useState([]);

  useEffect(() => {
    axiosInstance.get('api/order/courier/' + user.id).then((res) => changeOrders(res.data));
    }, []);
return (

<div className={styles.wrapper}>  
<Heading as='h3' size='xl'>
Личный кабинет курьера
</Heading> <br/><br/>
<Flex flexWrap='wrap' justifyContent='center'>
      {orders.map((el) => (
        <CourierCard key={el.id} element={el} changeOrders={changeOrders}></CourierCard>
      ))}
    </Flex>    
<Flex>
    </Flex>    
  </div>
);
}
