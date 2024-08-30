import {
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
  theme,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import OrderModal from '../Modals/OrderModal';
import axiosInstance from '../../tools/axiosInstance';
import { useParams } from 'react-router-dom';

const mock = {
  src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6-299JAubvODF7WnjVl0thalIFa3XwF6BzQ&s',
};


export default function OrderCard({element}) {
  const [orderDetails, setOrderDetails] = useState();

const { id } = useParams();
useEffect(() => {
  axiosInstance.get(`${import.meta.env.VITE_API}/order/${id}`).then((res) => {
    setOrderDetails(res.data);
    console.log(res.data);
  });
}, []);

  return (
    <Card width="15em">
      <Stack divider={<StackDivider className='curt' style={{margin:'0'}}/>} spacing="4">
        <Box>
          <CardBody>
            <Image
              src={mock.src}
              width="100%"
              margin="0 auto 1em auto"
              rounded="8px"
            />
            <Text marginBottom="10px">Заказ такой то</Text>
            <UnorderedList>
              <ListItem>Lorem ipsum dolor sit</ListItem>
              <ListItem>Consectetur adipiscing</ListItem>
              <ListItem>Integer molestie lorem at</ListItem>
              <ListItem>Facilisis in pretium nisl</ListItem>
            </UnorderedList>
          </CardBody>
        </Box>

        <OrderModal element={element}></OrderModal>
      </Stack>
    </Card>
  );
}
