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
    Wrap,
    WrapItem,
  } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import styles from './CostumerProfilePage.module.css'
  // import Form from '../../components/Form/Form';
  import axiosInstance from '../../tools/axiosInstance';
  import { Heading } from '@chakra-ui/react';
  import OrderCard from '../../components/Cards/OrderCard';

export default function CostumerProfilePage({user}) {
  const [orders, changeOrders] = useState([]);
  
  useEffect(() => {
    axiosInstance.get('api/order/user/' + user.id).then((res) => {changeOrders(res.data.map(el => el.Order))});
  }, []);
  return (
    <div className={styles.wrapper}>
      <Heading as="h3" size="xl">
        Личный кабинет покупателя
      </Heading>
      <br />
      <br />
      <Flex flexWrap='wrap' justifyContent='center'>
        {orders.map((el) => {
          return (<WrapItem key={el.id}><OrderCard  element={el} user={user} type='userLK'></OrderCard></WrapItem>)
        })}
      </Flex>
    </div>
  );
}
