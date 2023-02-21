import { IUser, IUserUpdate } from '../interfaces/user.interface';
import { PaymentMethod } from "../interfaces/user.interface";
import User from '../models/user.model';

export class UserService {
  async create(data: IUser, language?: string) {
    if (data.paymentDetails) {
    if (data.paymentDetails.paymentMethod === 'card') data.paymentDetails.paymentMethod = PaymentMethod.card;
    if (data.paymentDetails.paymentMethod === 'upi') data.paymentDetails.paymentMethod = PaymentMethod.upi;
    if (data.paymentDetails.paymentMethod === 'netbanking') data.paymentDetails.paymentMethod = PaymentMethod.netbanking;
    if (data.paymentDetails.paymentMethod === 'paypal') data.paymentDetails.paymentMethod = PaymentMethod.paypal;
    if (!data.paymentDetails.paymentMethod) data.paymentDetails.paymentMethod = PaymentMethod.default;
    }
    const user = new User(data);
    return user.save();
  }

  async getAll(clientId:string, limit:number,page : number,language ?: string) {
    const users =  await User.find({clientId}).limit(limit)
                          .skip(page * limit)
                          .lean()
                          .exec();
    return users;
  }

  async getOne( clientId : string , userId : string, language ?: string ) {
    const user = await User.findOne({clientId,_id:userId}).exec();
    return user;
  }

  async updateOne( clientId : string , userId : string, body : IUserUpdate, language ?: string ) {
    const user = await User.findOne({clientId,_id:userId}).exec();
    if(body.profilePic) user.profilePic = body.profilePic;
    if(body.phone_number) user.phone_number = body.phone_number;
    if(body.skills) user.skills = body.skills;
    if(body.language) user.language = body.language;
    if(body.addressDetails) user.addressDetails = body.addressDetails;
    if(body.dateOfBirth) user.dateOfBirth = body.dateOfBirth;
    return await User.update(user._id,user);
  }

  async delete( clientId : string , userId : string , language ?: string){
    return await User.findByIdAndRemove({id:userId}).exec();
  }

}
