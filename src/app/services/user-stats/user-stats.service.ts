import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "../services.constants";
import { UserStat } from "./user-stats";

@Injectable()
export class UserStatsService {
  constructor (private http: HttpClient) {

  }

  getUserStats(userId : String) : Observable<UserStat[]> {
    return this.http.get<UserStat[]>(Constants.BASE_URL + `/user/${userId}`)
  }
}