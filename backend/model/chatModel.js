import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  conversation: [
    {
      message: { type: String, required: true },
      response: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    }
  ],
});
const Chat = mongoose.model("Chat", ChatSchema);
export default Chat