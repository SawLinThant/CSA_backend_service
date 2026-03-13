"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/* Simple centralized logger; can be swapped for pino/winston later */
exports.logger = {
    info: (message, meta) => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify({ level: 'info', message, meta, time: new Date().toISOString() }));
    },
    error: (message, meta) => {
        // eslint-disable-next-line no-console
        console.error(JSON.stringify({ level: 'error', message, meta, time: new Date().toISOString() }));
    },
};
//# sourceMappingURL=logger.js.map