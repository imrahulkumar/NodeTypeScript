import * as mongoose from 'mongoose';
import { model } from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        username: { type: String, required: true },
        created_at: { type: Date, required: true, default: new Date() },
        updated_at: { type: Date, required: true, default: true }
    }
)

export default model('users', userSchema);