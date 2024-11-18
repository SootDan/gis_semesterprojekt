import { MongoClient } from "mongodb";

/**
 * Starts the MongoDB collection.
 */
interface User {
    name: string;
    password: string;
    subjects: Subjects[];
};

interface StudyTime {
    timeDone: number;
    date: Date;
};

export class Subjects {
    name: string;
    timeReq: number;
    timeDone?: number;
    hasDeadline: boolean;
    deadline?: Date;
    studyTime?: StudyTime[];

    constructor(name: string, time_req: number, has_deadline: boolean, deadline?: Date) {
        this.name = name;
        this.timeReq = time_req;
        this.hasDeadline = has_deadline;
        if (this.hasDeadline)
            this.deadline = deadline;
    }
}


export default class Database {
    client = new MongoClient("mongodb://127.0.0.1:27017/test");
    database = this.client.db("studytime");
    accounts = this.database.collection<User>("account");
    subjects = this.database.collection<Subjects>("subjects");

    async startDB() {
        console.log("MongoDB Server running at mongodb://127.0.0.1:27017/test");
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
     */
    async getAccountInfo(name: string) {
        const account = await this.accounts.findOne({name: name});
        return account;
    }


    /**
     * Checks if a login request is valid.
     */
    async loginAccount(name: string, password: string) {
        const account = await this.accounts.findOne({name: name, password: password});
        return account !== null;
    }
}