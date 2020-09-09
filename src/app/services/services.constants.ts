import { environment } from "../../environments/environment";

export class Constants {
    public static get BASE_URL(): string {
        if (environment.production) {
            return `https://${window.location.host.split('.')[0] + '-api'}`;
        } else {
            return 'http://localhost:3000';
        }
    }
}
