import {IUser} from "./Iuser";
import ENV from "../../utils/env";


class User implements IUser {
    login: string = ENV.USER_LOGIN
    password: string = ENV.USER_PASSWORD;
}

export default User;
