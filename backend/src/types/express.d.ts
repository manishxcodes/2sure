import { UserType } from "../models/user.model.ts";
// this extends Express.User with custom UserType
// will  prevent the error in login controller
// error - Property 'username' does not exist on type 'User'
declare global {
    namespace Express {
        interface User extends UserType {}
        interface Request {
            user?: User;
        }
    }
}