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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import OrderModal from '../Modals/OrderModal';
import axiosInstance from '../../tools/axiosInstance';

const mock = {
  src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6-299JAubvODF7WnjVl0thalIFa3XwF6BzQ&s',
};


export default function OrderCard({element}) {



  return (
    <Card width="15em">
      <Stack divider={<StackDivider />} spacing="4">
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
