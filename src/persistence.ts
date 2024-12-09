import { MongoClient } from "mongodb";

/**
 * Takes Docker .env information.
 */
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

/**
 * Starts the MongoDB collection.
 */
interface User {
    name: string;
    password: string;
    subjects: Subjects[];
};

export class StudyTime {
    timeDone: number;
    date: Date;

    constructor(timeDone: number, date: Date) {
        this.timeDone = timeDone;
        this.date = date;
    }
};

export class Subjects {
    name: string;
    timeReq: number;
    timeDone: number;
    hasDeadline: boolean;
    deadline?: Date;
    studyTime?: StudyTime[];

    constructor(name: string, time_req: number, has_deadline: boolean, deadline?: Date) {
        this.name = name;
        this.timeReq = time_req;
        this.hasDeadline = has_deadline;
        if (this.hasDeadline)
            this.deadline = deadline;

        this.studyTime = [{ timeDone: 0, date: new Date() }];
        this.timeDone = 0;
    }
}


export default class Database {
    client = new MongoClient(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`);
    database = this.client.db("studytime");
    accounts = this.database.collection<User>("account");
    subjects = this.database.collection<Subjects>("subjects");

    async startDB() {
        console.log("MongoDB Server running in Docker Container!");
        await this.client.connect();
    }


    /**
     * Creates a new account if one with the database doesn't already exist.
     */
    async createAccount(name: string, password: string, subjects: Subjects[]) {
        const nameExists = await this.accounts.findOne({ name: name });
        if (nameExists)
            return false;

        await this.accounts.updateOne(
            { name: name },
            {
                $setOnInsert: {
                    name: name,
                    password: password,
                    subjects: subjects
                }
            },
            { upsert: true }
        );
        console.log(`Account ${name} created.`);
        return true;
    }


    /**
     * Gets the info for each account and loads in their subjects.
     * Hides password from view.
     */
    async getAccountInfo(name: string) {
        return await this.accounts.findOne(
            {name: name},
            { projection: { password: 0 } });
    }


    /**
     * Checks if a login request is valid.
     */
    async loginAccount(name: string, password: string) {
        const account = await this.accounts.findOne(
            { name: name, password: password });
        return account !== null;
    }
}