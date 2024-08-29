import {
  Button,
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
import React from 'react';
import axiosInstance from '../../tools/axiosInstance';

export default function UserLKModal({
  children,
  header = 'заказ',
  element, // element из arr.map((element) => {})
  width = 'auto',
  rounded = '1'
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const takeOrder = () => {
    axiosInstance
      .put('api/order/', { id: element.id, status: 'delivery' })
      .then(console.log('все ок'))
      .catch((er) => console.log(er));
    onClose();
  };

  return (
    <>
      <Button width={width} onClick={onOpen} rounded={rounded}>
        Подробнее
      </Button>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" variant="ghost" mr={3} onClick={onClose}>
            Отменить заказ
            </Button>
            <Button colorScheme="green" variant="ghost" onClick={takeOrder}>
              Заказ получен!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
