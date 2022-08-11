import React, { useState } from 'react';
//APP COMPONENTS
import {
  MainForm,
  ModalComponent,
  ListComponent,
  ColorModeSwitcher,
} from './components';
//CHAKRA COMPONENTS
import {
  ChakraProvider,
  Box,
  useDisclosure,
  VStack,
  Grid,
  theme,
  Center,
  Text,
} from '@chakra-ui/react';
//UTIL
import useFetch from './util/useFetch';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState({
    latitude: '',
    longitude: '',
    date: '',
  });
  const [queries, setQueries] = useState([]);
  const [{ info, isError, isLoading }, fetchData] = useFetch();
  const { latitude, longitude, date } = query;
  const [isListLoading, setIsListLoading] = useState('idle');

  function handleSubmit(e) {
    e.preventDefault();

    if (latitude && longitude && date) {
      onOpen();
      fetchData(
        `https://crossorig.in/https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${-longitude}&date=${date}`
      );
    }
  }

  const saveQuery = () => {
    setIsListLoading(true);
    setQueries([
      ...queries,
      {
        ...info,
        date: query.date,
        key: new Date().getMilliseconds(query.sunrise),
      },
    ]);
    setTimeout(() => {
      setIsListLoading(false);
      setQuery({ latitude: '', longitude: '', date: '' });
    }, 1000);
  };

  const deleteQuery = id => {
    setIsListLoading(true);
    setTimeout(() => {
      setQueries(() => queries.filter(query => query.key !== id));
      setIsListLoading(false);
    }, 500);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <>
            {isOpen && !isError && (
              <ModalComponent
                onClose={onClose}
                onOpen={onOpen}
                isOpen={isOpen}
                title={query.date}
                info={info}
                saveQuery={saveQuery}
                isLoading={isLoading}
              />
            )}
            <Center>
              <VStack spacing={8}>
                <MainForm
                  onOpen={onOpen}
                  setQuery={setQuery}
                  query={query}
                  handleSubmit={handleSubmit}
                  disabled={!(latitude && longitude && date)}
                />
                {isError ? (
                  <Text>Upss... an error occurred please try again later!</Text>
                ) : (
                  <ListComponent
                    queries={queries}
                    isListLoading={isListLoading}
                    deleteQuery={deleteQuery}
                  />
                )}
              </VStack>
            </Center>
          </>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
