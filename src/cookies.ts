/**
 * Stores the data for a single user.
 */
class Session {
    databank;
    locale;
    timeFormat;

    constructor(databank: string,
        locale?: string, timeFormat?: string) {
        this.databank = databank;
        this.locale = locale;
        this.timeFormat = timeFormat;
    }
}