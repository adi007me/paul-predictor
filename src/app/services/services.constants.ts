import { environment } from "../../environments/environment";

export class Constants {
    public static get BASE_URL(): string {
        if (environment.production) {
            return 'https://paul-api.cfapps.io/';
        } else {
            return 'http://localhost:1337/';
        }
    }
}
