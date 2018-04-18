import { Team } from "../teams/team";

export interface Match {
    team1_id: String,
    team1: Team,
    team2_id: String,
    team2: Team,
    match_id: String,
    datetime: Date,
    result: String,
    points: Number,
    choiceChangeDisabled: Boolean,
    currentChoice: Boolean,
    checked: Boolean,
    choice: String
}