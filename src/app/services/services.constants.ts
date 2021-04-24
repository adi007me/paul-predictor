import { environment } from "../../environments/environment";

export class Constants {
    public static get BASE_URL(): string {
        if (environment.production) {
            // const locations = window.location.href.slice(0,-1).split('.');

            // return `${locations[0] + '-api'}.${locations[1]}.${locations[2]}`;

            return `/api`
        } else {
            return 'http://localhost:3000';
        }
    }
}
