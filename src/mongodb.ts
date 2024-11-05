import mongoose from "mongoose";

/**
 * A single subject and its data.
 */
interface ISubject {
    name: string;
    database: string;
    time_req: number;
    time_done: number;
    deadline: mongoose.Date;
}

/**
 * Starts the MongoDB collection.
 */
export default class Database {
    subjectSchema = new mongoose.Schema<ISubject> ({
        name: { type: String, required: true },
        database: { type: String, required: true },
        time_req: { type: Number, required: true},
        time_done: Number,
        deadline: Date
    })
    Subject = mongoose.model<ISubject>("Subject", this.subjectSchema);

    async startDB() {
        await mongoose.connect("mongodb://127.0.0.1:27017/test");

        // TODO: Make an actual schema out of this
        const subject = new this.Subject({
            name: "GIS",
            database: "Test",
            time_req: 135.00,
            time_done: 0.00,
            deadline: new Date(2025, 1, 15)
        })
        await subject.save();
        console.log("MongoDB running at mongodb://127.0.0.1:27017/test");
    }

    // TODO: Implement functionality
    async findSubject() {
        return await this.Subject.findOne({"database": "Test"});
    }
}