import axios from 'axios';
import { Email } from '../types/email';

const BASE_URL = 'https://flipkart-email-mock.now.sh';

export const api = {
  getEmails: async (page: number = 1) => {
    const response = await axios.get<{ list: Email[] }>(`${BASE_URL}/?page=${page}`);
    return response.data.list;
  },

  getEmailBody: async (id: string) => {
    const response = await axios.get<{ body: string }>(`${BASE_URL}/?id=${id}`);
    return response.data.body;
  }
};