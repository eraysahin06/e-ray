const { Schema, default: mongoose, models, model } = require('mongoose');

const AddressSchema = new Schema({
  userEmail: { type: String, unique: true, required: true },
  name: String,
  email: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  country: String,
});

export const Address = models?.Address || model('Address', AddressSchema);
