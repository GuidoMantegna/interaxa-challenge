import { useState, /*useEffect*/ } from 'react';

const useFetch = url => {
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async url => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(url).then(res => res.json());
      setInfo(response.results);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  //   fetchData(url);
  // }, [url]);

  return [{ info, isLoading, isError }, fetchData];
};

export default useFetch;
