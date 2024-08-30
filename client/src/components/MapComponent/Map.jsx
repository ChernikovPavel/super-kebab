import React, { useEffect, useState } from 'react';
import './MapComponent.css';
import { useParams, useNavigate } from 'react-router-dom';
import OrderCard from '../Cards/OrderCard';

import {
  Image,
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import axiosInstance from '../../tools/axiosInstance';

function Map({
  selectedOrder,
  setSelectedOrder,
  remuveMap,
  setRemuveMap,
  orderInDelivery,
  setOrderInDelivery,
  sortOrderForDelivery,
  user,
  setSortOrderForDelivery,
}) {
  const { id } = useParams();
  // const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const coordinatesToNumber = (coordinates) =>
    coordinates?.map((el) => Number(el));

  useEffect(() => {
    if (sortOrderForDelivery) {
      const findClass = document.querySelector('.ymaps-2-1-79-map');

      if (!remuveMap) {
        if (findClass) document.querySelector('#map').removeChild(findClass);
      }
      console.log('findClass', findClass);
      console.log('document.querySelector', document.querySelector('#map'));
      if (!findClass) {
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.src =
          'https://api-maps.yandex.ru/2.1.78/?apikey=24c18903-4f64-4649-87e4-d2621aa227b9&lang=ru_RU';
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          ymaps.ready(init);
          function init() {
            var myMap = new ymaps.Map(
              'map',
              { center: [59.70257936760503, 30.3656016400904], zoom: 10 },
              { searchControlProvider: 'yandex#search' }
            );

            if (
              Array.isArray(sortOrderForDelivery) &&
              sortOrderForDelivery.length > 0
            ) {
              sortOrderForDelivery.forEach((order) => {
                const { id, coordinates, new_order_price } = order;

                const placemark = new ymaps.Placemark(coordinates, {
                  preset: 'islands#governmentCircleIcon',
                  iconColor: 'red',
                });
                if (user) {
                  placemark.events.add('click', () => {
                    setSelectedOrder(order);
                    onOpen();
                  });
                }
                myMap.geoObjects.add(placemark);
              });
            }
          }
        };
        // Удаляем скрипт при размонтировании компонента
        return () => {
          document.body.removeChild(script);
        };
      }
    }
  }, [sortOrderForDelivery]);

  const chengeOrdersToCart = {
    order_id: id,
    user_id: user.id,
  };
  // console.log(selectedOrder);

  const remuveOnFormAddress = () => {
    navigate(`/form/address/${selectedOrder.id}`);

    onClose();
  };

  // const addOrderOnDelivery = () => {
  //   axiosInstance
  //     .put(`${import.meta.env.VITE_API}/order/${selectedOrder.id}`, {
  //       id: selectedOrder.id,
  //       status: 'delivery',
  //     })
  //     .then((res) => {
  //       setSelectedOrder((prev) => ({ ...prev, status: 'delivery' }));
  //       const changeState = sortOrderForDelivery.filter(
  //         (el) => el.id !== selectedOrder.id
  //       );
  //       setSortOrderForDelivery(changeState);
  //       navigate(`/form/address/${selectedOrder.id}`);
  //     })
  //     .catch((er) => console.log(er));
  //   onClose();
  // };

  return (
    <>
      <div id='map' className='map1'></div>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Информация о заказе</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOrder ? (
              <>
                <Flex>
                  {selectedOrder.Products?.map((el) => (
                    <Image
                      key={el.id}
                      objectFit='cover'
                      w='120px'
                      h='120px'
                      maxW={{ base: '100px', sm: '200px' }}
                      src={el.photo}
                      alt='Caffe Latte'
                    />
                  ))}
                </Flex>

                <Text>
                  Заказ: {selectedOrder.id}
                  <br />
                  Старая цена: {selectedOrder.old_order_price}
                  <br />
                  Новая цена: {selectedOrder.new_order_price}
                </Text>
              </>
            ) : (
              <Text>Нет информации о заказе</Text>
            )}
          </ModalBody>
          {user.email && (
            <ModalFooter>
              <Button
                colorScheme='gray'
                variant='ghost'
                mr={3}
                onClick={onClose}
              >
                Закрыть
              </Button>
              <Button
                colorScheme='orange'
                variant='ghost'
                onClick={remuveOnFormAddress}
              >
                Забираю!
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Map;
