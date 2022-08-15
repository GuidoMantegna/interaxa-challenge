import { useState /*useEffect*/ } from 'react';
import functions from './functions';

const useFetch = url => {
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async url => {
    setIsError(false);
    setIsLoading(true);
    try {
      // const response = await fetch(url).then(res => res.json());
      const response = await functions.getinfo(url);
      setInfo(response);
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
