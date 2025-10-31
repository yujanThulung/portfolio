export class Logger {
    private static getTimestamp(): string {
        return new Date().toISOString();
    }

    private static formatMessage(
        level: string,
        message: string,
        meta?: any,
    ): string {
        const timestamp = this.getTimestamp();
        const metaString = meta ? ` - ${JSON.stringify(meta)}` : '';
        return `[${level}] ${timestamp} - ${message}${metaString}`
    }

    static info(message: string, meta?: any): void {
        console.log(this.formatMessage('INFO', message, meta));
    }

    static error(message: string, error?: any): void {
        if (error instanceof Error) {
            console.error(this.formatMessage('ERROR', message, {
                message: error.message,
                stack: error.stack,
            }))
        } else {
            console.error(this.formatMessage('ERROR', message, error));
        }
    }

    static warn(message: string, meta?: any): void {
        console.warn(this.formatMessage('WARN', message, meta));
    }


    static debug(message: string, meta?: any): void {
        if (process.env.NODE_ENV === 'development') {
            console.debug(this.formatMessage('DEBUG', message, meta));
        }
    }


    static http(message: string, meta?: any): void {
        console.log(this.formatMessage('HTTP', message, meta));
    }
}