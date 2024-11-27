import { generateRandomString } from "../helpers/generate.helper";
import { User } from "../models/user.model";
import md5 from "md5";

export const resolversUser = {
  Query: {

  },
  Mutation: {
    registerUser: async (_, args) => {
      const { user } = args;
      
      const existUser = await User.findOne({
        email: user.email,
        deleted: false
      });
    
      if(existUser) {
        return {
          code: "error",
          message: "Email đã tồn tại trong hệ thống!"
        };
      }
    
      const dataUser = {
        fullName: user.fullName,
        email: user.email,
        password: md5(user.password),
        token: generateRandomString(30)
      };
    
      const newUser = new User(dataUser);
      await newUser.save();
    
      return {
        code: "success",
        message: "Đăng ký thành công!",
        id: newUser.id,
        ...dataUser
      };
    },
    
  }
};