import {
  chakra,
  Box,
  Card,
  CardBody,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import OrderModal from '../Modals/OrderModal';
import UserLKModal from '../Modals/UserLKModal';
import CourierModal from '../Modals/CourierModal';

const listing = (array) => {
  const result = [];
  const max = Math.min(array.length, 3);
  for (let i = 0; i < max; i++) {
    result.push(
      <ListItem key={array[i].id} textAlign="left">
        {array[i].product_name}
      </ListItem>
    );
  }
  return result;
};

export default function OrderCard({
  element,
  user,
  type = 'user',
  changeOrders,
}) {
  const switcherModal = () => {
    let component;
    switch (type) {
      case 'user':
        component = (
          <UserLKModal rounded="0" width="100%" element={element}>
            <Image
              src={element.Products[0].photo}
              width="100%"
              margin="0 auto 1em auto"
              rounded="8px"
            />
            <Text marginBottom="10px">Заказ №{element.id}</Text>
            <Box align="left">
              <Text fontWeight="500"> Общая стоимость: </Text>
              <chakra.span
                align="left"
                textColor="red"
                fontWeight="700"
                style={{ textDecoration: 'line-through 3px' }}
              >
                {element.old_order_price}
              </chakra.span>
              <chakra.span fontWeight="700" textColor="green">
                {element.new_order_price}
              </chakra.span>
              <chakra.span fontWeight="500"> USD </chakra.span>
            </Box>
            <UnorderedList>
              {element.Products.map((el) => (
                <ListItem key={el.id} textAlign="left">
                  {el.product_name}
                </ListItem>
              ))}
            </UnorderedList>
          </UserLKModal>
        );
        break;
      case 'courier':
        component = (
          <CourierModal
            rounded="0"
            width="100%"
            element={element}
            changeOrders={changeOrders}
          ></CourierModal>
        );
    }

    return component;
  };

  return (
    <Card
      width="20em"
      height="32.7em"
      margin="2em"
      justifyContent="space-between"
    >
      <Box>
        <CardBody>
          <Image
            src={element.Products[0].photo}
            width="100%"
            margin="0 auto 1em auto"
            rounded="8px"
          />
          <Text marginBottom="10px">Заказ №{element.id}</Text>
          <Box align="left">
            <Text fontWeight="500"> Общая стоимость: </Text>
            <chakra.span
              align="left"
              textColor="red"
              fontWeight="700"
              style={{ textDecoration: 'line-through 3px' }}
            >
              {element.old_order_price}
            </chakra.span>
            <chakra.span fontWeight="700" textColor="green">
              {element.new_order_price}
            </chakra.span>
            <chakra.span fontWeight="500"> USD </chakra.span>
          </Box>
          <UnorderedList>{listing(element.Products)}</UnorderedList>
        </CardBody>
      </Box>
      <Box>{switcherModal()}</Box>
    </Card>
  );
}
