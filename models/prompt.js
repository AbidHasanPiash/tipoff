import {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is requaired'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is requaired'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],

});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;