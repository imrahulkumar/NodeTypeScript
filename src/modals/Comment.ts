import * as mongoose from 'mongoose';
import { model } from 'mongoose'

const commentSchema = new mongoose.Schema(
    {

        created_at: { type: Date, required: true },
        updated_at: { type: Date, required: true },
        content: { type: String, required: true }
    }
)

export default model('comments', commentSchema);