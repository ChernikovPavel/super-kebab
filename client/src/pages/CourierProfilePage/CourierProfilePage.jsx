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
    axiosInstance.get('api/order/').then((res) => changeOrders(res.data));
  }, []);
  console.log('1',user.id);
  console.log('2',orders[0]);
return (

<div className={styles.wrapper}>  
<Heading as='h3' size='xl'>
Личный кабинет курьера
</Heading> <br/><br/>
<Flex>
      {orders.map((el) => {
        console.log('12134',el);
        
       return <CourierCard key={el.id} element={el} changeOrders={changeOrders}></CourierCard>
      }
      )}
    </Flex>    
  </div>
);
}
