import User from './User';

interface AuthData {
    "access_token": string;
    "token_type": string;
    "user": User;
}

export default AuthData;