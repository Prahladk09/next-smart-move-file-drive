import Axios from './Axios';

export const createFolder = (payload: {
    name: string;
    description?: string;
    parent?: string | null;
  }) => {
    Axios.post('/folders', payload)
  };

export const getFolderTree = () => Axios.get('/folders');


export const uploadFile = (formData: FormData) =>
  Axios.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const streamUploadProgress = (clientId: string) =>
  new EventSource(`${Axios.defaults.baseURL}/files/stream-progress?id=${clientId}`);
