import { environment } from "../../environments/environment";

export class Constants {
    public static get BASE_URL(): string {
        if (environment.production) {
            return 'https://paul-predictor-test-api.herokuapp.com';
        } else {
            return 'http://localhost:3000';
        }
    }
}
