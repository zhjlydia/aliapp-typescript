
import create, { RequestError } from '../factory';
import config from '../../config';

export class APIError extends Error {
  readonly code: number;
  constructor(code: number, message?: string) {
    super(message);
    this.code = code;
  }
}

const http = create(config.API_URL);

console.log(config)
http.interceptors.response.use(
  async res => {
    if (!res.data) {
      return res.data;
    }
    if (res.data.code) {
      throw new APIError(res.data.code, res.data.message);
    }
    return res.data.data;
  },
  async (error: RequestError) => {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
);
export default http;