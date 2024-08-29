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

export default function OrderModal({
  children,
  header = 'заказ',
  element, // element из arr.map((element) => {})
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
      <Button onClick={onOpen}>Подробнее</Button>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" variant="ghost" mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button colorScheme="orange" variant="ghost" onClick={takeOrder}>
              Забираю!
            </Button>
          </ModalFooter>
        </ModalContent>
        
      </Modal>
    </>
  );
}
