import { publicApi } from './custom-axios.js';

export const todoExport = async (params) => {
  const response = await publicApi.get(`/export?${params}`, {
    responseType: 'arraybuffer',
    Accept      : 'application/octet-stream',
  });
  return response;
};