import {
  chakra,
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
import styles from './CostumerProfilePage.module.css';
// import Form from '../../components/Form/Form';
import axiosInstance from '../../tools/axiosInstance';
import { Heading } from '@chakra-ui/react';
import OrderCard from '../../components/Cards/OrderCard';

export default function CostumerProfilePage({ user }) {
  const [orders, changeOrders] = useState([]);

  useEffect(() => {
    axiosInstance.get('api/order/withuser/' + user.id).then((res) => {
      console.log(res.data.ordersInCart);
      // console.log(res.data[0].Order.Products)
      changeOrders(res.data.ordersInCart.map((el) => el));
    });
  }, []);
console.log('orders', orders)
  return (
    <div className={styles.wrapper}>
      <Heading as="h3" size="xl">
        <Text></Text>
        Личный кабинет покупателя
        <chakra.span fontWeight="900" color="#f37b3f">

          {user.username}
        </chakra.span>
      </Heading>
      <br />
      <br />
      <Flex flexWrap="wrap" justifyContent="center">
        {orders.map((el) => {
          return (
            <WrapItem key={el.id}>
              <OrderCard element={el} user={user} type="userLK"></OrderCard>
            </WrapItem>
          );
        })}
      </Flex>
    </div>
  );
}
