import { environment } from "../../environments/environment";

export class Constants {
    public static get BASE_URL(): string {
        if (environment.production) {
            return 'https://paul-webapi.cfapps.io/';
        } else {
            return 'http://localhost:1337/';
        }
    }
    //https://paul-webapi.cfapps.io/
    //http://localhost:1337/
}
