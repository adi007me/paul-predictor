import { environment } from "../../environments/environment";

export class Constants {
    public static get BASE_URL(): string {
        if (environment.production) {
            const location = window.location;
            
            return `https://${location[0] + '-api'}.${location[1]}.${location[2]}`;
        } else {
            return 'http://localhost:3000';
        }
    }
}
