import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    apartment: {
      type: Schema.Types.ObjectId,
      ref: 'Apartment',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;
