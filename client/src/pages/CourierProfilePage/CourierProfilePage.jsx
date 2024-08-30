import {
  Button,
  Flex,
  chakra,
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
import styles from './CourierProfilePage.module.css';
import axiosInstance from '../../tools/axiosInstance';
import { Heading } from '@chakra-ui/react';
import OrderCard from '../../components/Cards/OrderCard';

export default function CourierProfilePage({ user }) {
  const [orders, changeOrders] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('api/order/courier/' + user.id)
      .then((res) => changeOrders(res.data));
  }, []);
  return (
    <div className={styles.wrapper}>
      <Heading as="h3" size="xl">
        <chakra.span>Личный кабинет курьера&nbsp;</chakra.span>
        <chakra.span fontWeight="900" color="#f37b3f">
          {user.username}
        </chakra.span>
      </Heading>
      <Flex flexWrap="wrap" justifyContent="center">
        {orders.map((el) => (
          <OrderCard
            key={el.id}
            element={el}
            changeOrders={changeOrders}
            type="courier"
          ></OrderCard>
        ))}
      </Flex>
    </div>
  );
}
