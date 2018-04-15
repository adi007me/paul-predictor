import { Choice } from "./../choices/choice";

export interface User {
    choices: Choice[],
    emailId: string,
    name: string,
    profilePic: string,
    userName : string,
}