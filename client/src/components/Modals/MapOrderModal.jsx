import {
  Button,
  Flex,
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

export default function MapOrderModal({
  children,
  header = 'заказ',
  element, // element из arr.map((element) => {})
  isOpen,
  onClose,
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const takeOrder = () => {
    axiosInstance
      .put('api/order/', { id: element.id, status: 'delivery' })
      .then(console.log('все ок'))
      .catch((er) => console.log(er));
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexWrap='wrap' justifyContent='center' width='100px'>
            
            {children}
            </Flex>
            </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' variant='ghost' mr={3} onClick={onClose}>
              Закрыssssssть
            </Button>
            <Button colorScheme='orange' variant='ghost' onClick={takeOrder}>
              Забsssираю!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
