import { string } from "joi";

export interface IUserAddress {
  addressLine1: string;
  townORcity: string;
  pinCode: string;
  state: string;
  country: string;
}

export enum PaymentMethod {
  upi = 'upi',
  card = 'card',
  netbanking = 'netbanking',
  paypal = 'paypal',
  default = 'paypal',
}
export interface IPaymentDetails extends Document {
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  ifscCode: string;
  custId: string;
  paymentMethod: PaymentMethod;
}
export interface IPartialHoliday extends Document {
  date: string;
  time: string[];
}
export interface IHoliday extends Document {
  date: string[];
  reason: string;
}

export interface IWorkingHours extends Document {
  0: string[];
  1: string[];
  2: string[];
  3: string[];
  4: string[];
  5: string[];
  6: string[];
}
export interface ICoverage extends Document {
    partial_working_hours:IPartialHoliday[];
    holidays:IHoliday[];
    working_hours:IWorkingHours;
    alternate_working_days:string[];
}
export interface IUser extends Document {
  name?: string;
  email?: string;
  clientId?: string;
  profilePic ?: string;
  phone_number?: string;
  dateOfBirth?: string;
  addressDetails?: IUserAddress;
  paidHolidayRemaining?: string;
  coverage?: ICoverage;
  role?:  string;
  skills?: string[];
  timezone?: string;
  language?: string[];
  paymentDetails?: IPaymentDetails;
  department ?: string;
};

export interface IUserUpdate extends Document {
  profilePic  ?: string;
  phone_number ?: string;
  skills ?: string[];
  language ?: string[];
  addressDetails ?: IUserAddress;
  dateOfBirth ?: string;
}