import React from 'react';
//CHAKRA COMPONENTS
import {
  Text,
  VStack,
  InputGroup,
  InputRightElement,
  Icon,
  Input,
  Button,
  Box,
} from '@chakra-ui/react';
//ICONS
import { RiRulerLine } from 'react-icons/ri';

const MainForm = ({
  setQuery,
  query: { latitude, longitude, date },
  query,
  handleSubmit,
  disabled,
}) => {
  const handleChange = e => {
    const { valueAsNumber, name, value } = e.target;
    name !== 'date'
      ? setQuery({ ...query, [name]: valueAsNumber })
      : setQuery({ ...query, [name]: value });
  };

  return (
    <Box w={{base: '80%', sm: '70%', md: '100%'}}>
      <form onSubmit={handleSubmit}>
        <VStack align="flex-start" mb={3}>
          <Text fontSize="md">Latitude</Text>
          <InputGroup>
            <InputRightElement
              pointerEvents="none"
              children={<Icon as={RiRulerLine} />}
            />
            <Input
              name="latitude"
              value={latitude}
              onChange={handleChange}
              type="number"
              placeholder="0,000000"
              boxShadow="2px 2px 2px rgba(124, 124, 124, .25)"
            />
          </InputGroup>
          <Text fontSize="xs" mt="0">
            *in decimal degrees. Required.
          </Text>
        </VStack>
        <VStack align="flex-start" mb={3}>
          <Text fontSize="md">Longitude</Text>
          <InputGroup>
            <InputRightElement
              pointerEvents="none"
              children={<Icon as={RiRulerLine} />}
            />
            <Input
              name="longitude"
              value={longitude}
              onChange={handleChange}
              type="number"
              placeholder="0,000000"
              boxShadow="2px 2px 2px rgba(124, 124, 124, .25)"
            />
          </InputGroup>
          <Text fontSize="xs" mt="0">
            *in decimal degrees. Required.
          </Text>
        </VStack>
        <VStack align="flex-start" mb={3}>
          <Text fontSize="md">Date</Text>
          <Input
            name="date"
            value={date}
            onChange={handleChange}
            placeholder="Select Date and Time"
            size="md"
            type="date"
            boxShadow="2px 2px 2px rgba(124, 124, 124, .25)"
          />
          <Text fontSize="xs" mt="0">
            Pick a date.
          </Text>
        </VStack>
        <Button
          colorScheme="green"
          variant="outline"
          mt={6}
          type="submit"
          disabled={disabled}
        >
          SUBMIT
        </Button>
      </form>
    </Box>
  );
};

export default MainForm;
