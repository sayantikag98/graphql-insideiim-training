import { AuthChecker } from "type-graphql";
import Context from "../types/context";

const authChecker: AuthChecker<Context> = ({root, args, context, info}) => {
    // if the user exists then return true otherwise false
    return !!context.user;
}

export default authChecker;