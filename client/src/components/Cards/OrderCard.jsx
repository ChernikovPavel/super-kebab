import {
  chakra,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  ListItem,
  Stack,
  StackDivider,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import OrderModal from '../Modals/OrderModal';
import axiosInstance from '../../tools/axiosInstance';

const mock = {
  src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6-299JAubvODF7WnjVl0thalIFa3XwF6BzQ&s',
};


export default function OrderCard({element, roundedButton}) {


console.log(element)
  return (
    <Card width="20em" margin='2em'>
      <Stack divider={<StackDivider style={{margin:'0'}}/>} spacing="4">
        <Box>
          <CardBody>
            <Image
              src={element.Products[0].photo}
              width="100%"
              margin="0 auto 1em auto"
              rounded="8px"
            />
            <Text marginBottom="10px" >Заказ №{element.id}</Text>
            <Text align='left'>
            <Text  fontWeight='500'> Общая стоимость: </Text>
            <chakra.span align='left' textColor='red' fontWeight='700' style={{textDecoration: 'line-through 3px'}}>{element.old_order_price}</chakra.span>
            <chakra.span fontWeight='700' textColor='green'> {element.new_order_price}</chakra.span>
            <chakra.span  fontWeight='500'> USD </chakra.span>
            </Text>
            <UnorderedList>
              {element.Products.map((el) => (<ListItem textAlign='left'>{el.product_name}</ListItem>))}
            </UnorderedList>
          </CardBody>
        </Box>
        <Box>
        <OrderModal rounded='0' width='100%' element={element}></OrderModal>
        </Box>
      </Stack>
    </Card>
  );
}
