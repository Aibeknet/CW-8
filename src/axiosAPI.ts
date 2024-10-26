import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'https://askaroff-hub-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const fetchQuotes = async (category?: string) => {
  const response = await axiosAPI.get('quotes.json', {
    params: category ? { orderBy: '"category"', equalTo: `"${category}"` } : {},
  });
  return response.data;
};

export const addQuote = async (quote: { author: string; text: string; category: string }) => {
  const response = await axiosAPI.post('quotes.json', quote);
  return response.data;
};

export const updateQuote = async (id: string, quote: { author: string; text: string; category: string }) => {
  const response = await axiosAPI.put(`quotes/${id}.json`, quote);
  return response.data;
};

export const deleteQuote = async (id: string) => {
  await axiosAPI.delete(`quotes/${id}.json`);
};

export const getQuote = async (id: string) => {
  const response = await axiosAPI.get(`quotes/${id}.json`);
  return response.data;
};
