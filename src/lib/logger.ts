export const log = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },
};

export const apiLog = {
  request: (method: string, url: string, data?: any) => {
    log.info(`API Request: ${method} ${url}`, data);
  },
  response: (method: string, url: string, status: number) => {
    if (status >= 400) {
      log.error(`API Response: ${method} ${url} - ${status}`);
    } else {
      log.info(`API Response: ${method} ${url} - ${status}`);
    }
  },
};
