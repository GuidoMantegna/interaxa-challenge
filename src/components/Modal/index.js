import React from 'react';
//CHAKRA COMPONENTS
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  VStack,
  HStack,
  Text,
  Skeleton,
} from '@chakra-ui/react';

const ModalComponent = ({
  isOpen,
  onOpen,
  onClose,
  title,
  info: { sunrise, sunset, solar_noon, day_length },
  saveQuery,
  isLoading,
}) => {
  const handleClick = () => {
    saveQuery();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems="center" w={{ base: '90%' }}>
          <ModalHeader textAlign="center">{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Skeleton isLoaded={!isLoading} borderRadius={4}>
                <Text fontSize="sm">
                  <strong>Sunrise</strong> {sunrise}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} borderRadius={4}>
                <Text fontSize="sm">
                  <strong>Sunset</strong> {sunset}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} borderRadius={4}>
                <Text fontSize="sm">
                  <strong>Solar noon</strong> {solar_noon}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} borderRadius={4}>
                <Text fontSize="sm">
                  <strong>Day length</strong> {day_length}
                </Text>
              </Skeleton>
            </VStack>
          </ModalBody>

          <HStack m={10}>
            <Button
              colorScheme="green"
              variant="outline"
              minW="100px"
              onClick={handleClick}
            >
              SAVE
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              minW="100px"
              onClick={onClose}
            >
              FORGET
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
