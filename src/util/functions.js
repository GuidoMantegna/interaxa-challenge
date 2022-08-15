const axios = require('axios');

const functions = {
  add: (num1, num2) => num1 + num2,
  deleteQuery: (id, queries) => queries.filter(query => query.key !== id),
  showOnlyFavs: queries => queries.filter(query => query.fav),
  addFav: (id, queries) =>
    queries.map(query => {
      if (query.key === id) {
        return { ...query, fav: !query.fav };
      }
      return query;
    }),
  dateToKey: date => new Date().getMilliseconds(date),
  getinfo: url => {
    const data = axios.get(url).then(res => res.data.results);
    // const data = axios.get(url).then(res => res);
    return data;
  },
};
module.exports = functions;
