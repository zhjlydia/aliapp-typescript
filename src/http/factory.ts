import Fly from 'flyio/dist/npm/ap';
import { FlyError } from 'flyio';

declare module 'flyio' {
  interface FlyResponseInterceptor<V> {
    use(
      onSucceed?: (response: V) => any,
      onError?: (err: FlyError) => any
    ): void;
  }
}

export { FlyError as RequestError };

export default function create(baseUrl: any) {

  const http = new Fly();
  http.config.headers = {
    'Content-Type': 'application/json'
  };
  http.config.baseURL = baseUrl;
  http.interceptors.request.use(async req => {
    http.lock();
    try {
      return cleanup(req);
    } finally {
      http.unlock();
    }
  });

  return http;
}

function cleanup(req: any) {
  for (const key in req.headers) {
    if (req.headers[key] == null) {
      delete req.headers[key];
    }
  }
  return req;
}
