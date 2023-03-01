import axios from "axios";
import { useStateContext } from '../contexts/ContextProvider';

async function fetcher (url, params, headers) {
  
  try {
    const res = await axios.get(url, {
      headers: headers,
      withCredentials: true,
    });

    return res;
  } catch (e) {
    return null;
  }
};

export default fetcher;
