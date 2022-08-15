import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider, theme } from '@chakra-ui/react';

const AllProviders = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
import functions from './util/functions';
const axios = require('axios');

test('Key must be a number', () => {
  const date = '6:17:40 AM';
  expect(typeof functions.dateToKey(date)).toBe('number');
});

test('Delets the item that matchs the id', () => {
  const queries = [
    { key: 103, data: 'Dummy data 23' },
    { key: 37, data: 'Dummy data 509' },
  ];
  expect(functions.deleteQuery(103, queries)).toEqual([
    { key: 37, data: 'Dummy data 509' },
  ]);
});

test('Changes the fav value', () => {
  const queries = [
    { key: 103, data: 'Dummy data 23', fav: false },
    { key: 37, data: 'Dummy data 509', fav: false },
  ];
  const changeFavs = functions.addFav(37, queries);
  expect(changeFavs[1].fav).toBeTruthy();
});

test('Filters only FAVS', () => {
  const queries = [
    { key: 103, data: 'Dummy data 23', fav: false },
    { key: 37, data: 'Dummy data 509', fav: true },
  ];
  expect(functions.showOnlyFavs(queries)).toEqual([
    { key: 37, data: 'Dummy data 509', fav: true },
  ]);
});

test('The request must contain a valid object', async () => {
  const URL =
    'https://crossorig.in/https://crossorig.in/https://api.sunrise-sunset.org/json?lat=23.5&lng=-6.3&date=2022-07-08';
  const data = await functions.getinfo(URL);
  const { sunrise } = data;
  expect(typeof data).toBe('object');
  expect(sunrise).toMatch(/5:43:40 AM/);
});
