import { publicApi } from './custom-axios.js';

export const todoExport = async (params) => {
  const response = await publicApi.get(`/calendar?export=${params}`, {
    Accept: 'application/octet-stream',
  });
  return response;
};