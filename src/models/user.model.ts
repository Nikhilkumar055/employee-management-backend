import { AnySchema } from "joi";
import { Model, model, Schema } from "mongoose";
import { IUser, PaymentMethod } from "./../interfaces/user.interface";

export const userDetails = new Schema({
  phone_number: { type: String ,required : true},
  email: { type: String, unique: true },
  name: { type: String ,required : true},
  profilePic: { type: String ,required : false},
  dateOfBirth: { type: String ,required : true},
  paidHolidayRemaining: { type: String ,required : false,default:0},
  role: { type: String ,required : false},
  skills: [{ type: String ,required : false}],
  language: [{ type: String ,required : false}],
  timezone: { type: Date ,required : false},
  department: { type: String ,required : false},
  paymentDetails: {
    bankName: { type: String ,required : false},
    bankAddress: { type: String ,required : false},
    accountNumber: { type: String ,required : false},
    ifscCode: { type: String ,required : false},
    custId: { type: String ,required : false},
    paymentMethod: { type: String ,enum: Object.values(PaymentMethod)},
  },
  coverage: {
    partial_working_hours:[{
        date: { type: String ,required : false},
        time: { type: String ,required : false},
      }],
    holidays: [{
        date: { type: String ,required : false},
        reason: { type: String ,required : false},
      }],
    working_hours : {
      0: [{ type: String ,required : false}],
      1: [{ type: String ,required : false}],
      2: [{ type: String ,required : false}],
      3: [{ type: String ,required : false}],
      4: [{ type: String ,required : false}],
      5: [{ type: String ,required : false}],
      6: [{ type: String ,required : false}],
    },
    alternate_working_days: [{ type: String ,required : false}],
  },
  addressDetails: {
    addressLine1: { type: String ,required : false},
    townORcity: { type: String ,required : false},
    pinCode: { type: String ,required : false},
    state: { type: String ,required : false},
    country: { type: String ,required : false},
  },
});

const User: Model<any> = model<any>("user", userDetails);
export default User;
