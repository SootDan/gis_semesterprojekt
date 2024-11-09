import { MongoClient } from "mongodb";

/**
 * Starts the MongoDB collection.
 */
interface User {
    name: string;
    password: string;
    subject_number: number;
    subjects: Subjects[];
}

export interface Subjects {
    name: string;
    time_req: number;
    time_done: number;
    has_deadline: boolean;
    deadline: Date;
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
    async createAccount(name: string, password: string, subject_number: number, subjects: Subjects[]) {
        const nameExists = await this.accounts.findOne({ name: name });
        if (nameExists)
            return false;

        await this.accounts.updateOne(
            { name: name },
            {
                $setOnInsert: {
                    name: name,
                    password: password,
                    subject_number: subject_number,
                    subjects: subjects
                }
            },
            { upsert: true}
        );
        return true;
    }

    /**
     * Gets the info for each account and loads in their subjects.
     */
    async getAccountInfo(name: string) {
        const account = await this.accounts.findOne({name: name});
        return account;
    }
}