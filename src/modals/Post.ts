import * as mongoose from 'mongoose';
import { model } from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Types.ObjectId, required: true },
        created_at: { type: Date, required: true },
        updated_at: { type: Date, required: true },
        content: { type: String, required: true }

    }
)

export default model('posts', postSchema);