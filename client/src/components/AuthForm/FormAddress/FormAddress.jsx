import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardBody,
  CheckboxIcon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import axiosInstance from '../../../tools/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function FormAddress({
  sortOrderForDelivery,
  setAddress,
  address,
  selectedOrder,
  setSelectedOrder,
  setSortOrderForDelivery,
}) {
  const [inputs, setInputs] = useState();
  const [inputAddress, setInputAddress] = useState();
  const [coord, setCoord] = useState([]);
  const navigate = useNavigate();

  const coordinatesToNumber = (coordinates) =>
    coordinates?.map((el) => Number(el));

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setInputAddress((prev) => ({ ...prev, delivery_address: e.target.value }));
  };

  const addressHandler = () => {
    fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=24c18903-4f64-4649-87e4-d2621aa227b9&geocode=${encodeURIComponent(
        inputAddress.delivery_address
      )}&format=json`
    )
      .then((res) => res.json())
      .then((data) =>
        setCoord([
          data.response.GeoObjectCollection.featureMember[0].GeoObject.Point
            .pos,
        ])
      );

    const newCoordinates = coordinatesToNumber(coord);

    axiosInstance
      .put(`${import.meta.env.VITE_API}/order/${selectedOrder.id}`, {
        id: selectedOrder.id,
        status: 'delivery',
        delivery_address: inputAddress.delivery_address,
        coordinates: newCoordinates,
      })
      .then((res) => {
        setSelectedOrder((prev) => ({ ...prev, status: 'delivery' }));
        const changeState = sortOrderForDelivery.filter(
          (el) => el.id !== selectedOrder.id
        );
        setSortOrderForDelivery(changeState);
        if (res.status === 200) {
          navigate('/');
        }
      })
      .catch((er) => console.log(er));
  };

  return (
    <Card m='150px auto' width='30em'>
      <Box>
        <CardBody spacing={3}>
          <Text>Введите номер телефона и адрес доставки</Text>
          <br />
          <Stack spacing={3}>
            <InputGroup spacing={3}>
              <InputLeftElement pointerEvents='none'></InputLeftElement>
              <Input
                onChange={changeHandler}
                name='pone'
                type='tel'
                placeholder='Телефонный номер'
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
              ></InputLeftElement>
              <Input
                onChange={changeHandler}
                name='delivery_address'
                placeholder='Адресс доставки'
              />
              <InputRightElement>
                <CheckboxIcon color='green.500' />
              </InputRightElement>
            </InputGroup>
          </Stack>
        </CardBody>
        <Box>
          <Button onClick={addressHandler} spacing={3}>
            Подтвердить доставку
          </Button>
        </Box>
        <br />
      </Box>
    </Card>
  );
}
