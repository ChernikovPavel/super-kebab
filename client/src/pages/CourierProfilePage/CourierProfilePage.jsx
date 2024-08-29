import { useState, useEffect } from 'react';
// import Form from '../../components/Form/Form';
import styles from './CourierProfilePage.module.css';
import axiosInstance from '../../axiosInstance';
import { Heading } from '@chakra-ui/react';
import ListCourier from '../../components/List/ListCourier';
export default function CourierProfilePage({ user }) {


return (

<div className={styles.wrapper}>  
<Heading as='h3' size='xl'>
Личный кабинет курьера
</Heading> <br/><br/>
    <ListCourier  user={user}/>      
  </div>
);
}
