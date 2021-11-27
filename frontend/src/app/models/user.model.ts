export default interface User {
    status: string;
    name: string;
    email: string;
    password: string;
    data: {
        token: string;
    }
}