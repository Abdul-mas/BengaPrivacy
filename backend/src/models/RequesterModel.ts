import mongoose from 'mongoose';

export interface Requester {
  id: string;
  req?: string;
  privacy: string;
}

const requesterSchema = new mongoose.Schema<Requester>({
  id: { type: String, required: true },
  req: { type: String }, // optional on registration
  privacy: { type: String, required: true },
});

const RequesterModel = mongoose.model<Requester>('RequesterLog', requesterSchema);

export default RequesterModel;
