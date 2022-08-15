import React from 'react';
//CHAKRA COMPONENTS
import {
  List,
  ListItem,
  ListIcon,
  Text,
  HStack,
  Skeleton,
  Icon,
  Button,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
// ICONS
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const ListComponent = ({
  queries,
  isListLoading,
  deleteQuery,
  addFav,
  showOnlyFavs,
}) => {
  return isListLoading === 'idle' ? (
    <Text>Welcome! Make your query.</Text>
  ) : (
    <>
      <FormControl display="flex" alignItems="center" justifyContent="center">
        <FormLabel htmlFor="email-alerts" mb="0" fontSize="xs" color="teal">
          SHOW FAVS
        </FormLabel>
        <Switch id="email-alerts" colorScheme="teal" onChange={showOnlyFavs} />
      </FormControl>
      <List spacing={3}>
        {queries.map((query, index) => {
          return (
            <Skeleton
              isLoaded={!isListLoading}
              borderRadius={4}
              key={query.key}
            >
              <HStack spacing={4} key={query.key}>
                <ListItem>
                  <HStack justify="center">
                    <ListIcon
                      as={index % 2 === 0 ? FiSunrise : FiSunset}
                      color={index % 2 === 0 ? 'yellow.400' : 'red.600'}
                    />
                    <Text fontSize="md">{query.date}</Text>
                  </HStack>
                  <Text fontSize="xs">
                    Sunrise {query.sunrise} | Sunset {query.sunset}
                  </Text>
                  <Text fontSize="xs">
                    Solar noon {query.solar_noon} | Day Length{' '}
                    {query.day_length}
                  </Text>
                </ListItem>
                <HStack>
                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    onClick={() => deleteQuery(query.key)}
                  >
                    <Icon as={BsTrash} />
                  </Button>
                  <Button
                    colorScheme="yellow"
                    variant="ghost"
                    onClick={() => addFav(query.key)}
                  >
                    <Icon
                      as={query.fav === true ? AiFillStar : AiOutlineStar}
                    />
                  </Button>
                </HStack>
              </HStack>
            </Skeleton>
          );
        })}
      </List>
    </>
  );
};
export default ListComponent;
