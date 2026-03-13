/* Simple centralized logger; can be swapped for pino/winston later */
export const logger = {
  info: (message: string, meta?: unknown) => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify({ level: 'info', message, meta, time: new Date().toISOString() }));
  },
  error: (message: string, meta?: unknown) => {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify({ level: 'error', message, meta, time: new Date().toISOString() }));
  },
};

