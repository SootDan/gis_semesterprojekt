
import mongoose from "mongoose";

/**
 * Starts the MongoDB collection.
 */
export class Database {
    static async startDB() {
        //await mongoose.connect("mongodb://127.0.0.1:27017/test");
        //connection();
        // TODO: Make an actual schema out of this
        console.log("MongoDB running at mongodb://127.0.0.1:27017/test");
    }

    // TODO: Implement functionality
    static async findSubject() {
        await this.startDB();

        interface ISubject {
            name: string;
            database: string;
            time_req: number;
            time_done: number;
            deadline: mongoose.Date;
        }

        const subjectSchema = new mongoose.Schema<ISubject> ({
            name: { type: String, required: true },
            database: { type: String, required: true },
            time_req: { type: Number, required: true},
            time_done: Number,
            deadline: Date
        })
        const Subject = mongoose.model<ISubject>("Subject", subjectSchema);

        const subject = new Subject({
            name: "GIS",
            database: "Test",
            time_req: 135.00,
            time_done: 0.00,
            deadline: new Date(2025, 1, 15)
        });
        //await subject.save();
        //const subjects = await Subject.find();
        return subject;
    }

    static print() {
        console.log("j'existe");
    }
}

export default Database;