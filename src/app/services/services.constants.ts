import { environment } from "../../environments/environment";

export class Constants {
    public static get BASE_URL(): string {
        if (environment.production) {
            return 'https://3000-f6a84fe5-7a94-45ef-a49e-c3c0939547c1.ws-ap01.gitpod.io';
        } else {
            return 'https://3000-f6a84fe5-7a94-45ef-a49e-c3c0939547c1.ws-ap01.gitpod.io';
        }
    }
}
