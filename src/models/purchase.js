import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clients', required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books', required: true }],
    bookFormat: { type: String, required: true },
    filePath: { type: String, required: true },
    price: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Canceled'], default: 'Pending' },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Purchases = mongoose.model('Purchases', purchaseSchema);

export default Purchases;
