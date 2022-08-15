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
  Divider,
} from '@chakra-ui/react';
//UTIL
import useFetch from './util/useFetch';
import functions from './util/functions';

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
  const [favQueries, setFavQueries] = useState(null);

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
        key: functions.dateToKey(query.sunrise),
        fav: false,
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
      let newQueries = functions.deleteQuery(id, queries);
      setQueries(newQueries);
      setIsListLoading(false);
    }, 500);
  };

  const addFav = id => {
    setQueries(functions.addFav(id, queries));
  };

  const showOnlyFavs = () => {
    favQueries
      ? setFavQueries(null)
      : setFavQueries(functions.showOnlyFavs(queries));
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
                <Divider />
                {isError ? (
                  <Text>Upss... an error occurred please try again later!</Text>
                ) : (
                  <ListComponent
                    queries={favQueries ? favQueries : queries}
                    isListLoading={isListLoading}
                    deleteQuery={deleteQuery}
                    addFav={addFav}
                    showOnlyFavs={showOnlyFavs}
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
