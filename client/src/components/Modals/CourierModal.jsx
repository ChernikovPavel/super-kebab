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
  
  export default function CourierModal({
    children,
    header = 'заказ',
    element, // element из arr.map((element) => {})
    width = 'auto',
    rounded = '1',
    changeOrders
  }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("12", element);
  
    const deleteOrder = async () => {
        const res = await axiosInstance.delete(
          `${import.meta.env.VITE_API}/order/${element.id}`
        );
        if (res.status === 200) {
         changeOrders((prev) => prev.filter((el) => el.id !== element.id));
        }
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
              <Button  colorScheme="gray" variant="ghost" mr={3} onClick={onClose}>
                Закрыть
              </Button>
              <Button  isDisabled = {element.status === 'delivery'} colorScheme="red" variant="ghost" onClick={deleteOrder}>
                Удалить
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  