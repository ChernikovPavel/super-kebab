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



export default function OrderCard({ element, roundedButton, user, type='map'}) {


  return (
    <Card width="20em" height='32.7em' margin='2em' justifyContent='space-between'>
        <Box>
          <CardBody>
            <Image
              src={element.Products[0].photo}
              width="100%"
              margin="0 auto 1em auto"
              rounded="8px"
            />
            <Text marginBottom="10px" >Заказ №{element.id}</Text>
            <Box align='left'>
            <Text fontWeight='500'> Общая стоимость: </Text>
            <chakra.span align='left' textColor='red' fontWeight='700' style={{textDecoration: 'line-through 3px'}}>{element.old_order_price}</chakra.span>
            <chakra.span fontWeight='700' textColor='green'> {element.new_order_price}</chakra.span>
            <chakra.span  fontWeight='500'> USD </chakra.span>
            </Box>
            <UnorderedList>
              {element.Products.map((el) => (<ListItem key={el.id} textAlign='left'>{el.product_name}</ListItem>))}
            </UnorderedList>
          </CardBody>
        </Box>
        <Box>
          {type === 'userLK' ? 
        <UserLKModal rounded='0' width='100%' element={element}>
                      <Image
              src={element.Products[0].photo}
              width="100%"
              margin="0 auto 1em auto"
              rounded="8px"
            />
            <Text marginBottom="10px" >Заказ №{element.id}</Text>
            <Box align='left'>
            <Text  fontWeight='500'> Общая стоимость: </Text>
            <chakra.span align='left' textColor='red' fontWeight='700' style={{textDecoration: 'line-through 3px'}}>{element.old_order_price}</chakra.span>
            <chakra.span fontWeight='700' textColor='green'> {element.new_order_price}</chakra.span>
            <chakra.span  fontWeight='500'> USD </chakra.span>
            </Box>
            <UnorderedList>
              {element.Products.map((el) => (<ListItem key={el.id} textAlign='left'>{el.product_name}</ListItem>))}
            </UnorderedList>
          </UserLKModal>
          : 
          <OrderModal rounded='0' width='100%' element={element}></OrderModal>
          }
        </Box>
    </Card>
  );
}
