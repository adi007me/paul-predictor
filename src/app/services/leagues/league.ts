import { Match } from "./match";

export interface League {
    name: String,
    shortName: String,
    startDate: Date,
    endDate: Date,
    matches: Match[],
    currentBet: Match[],
    completedMatches: Match[],
    recentMatches: Match[],
    upcomingMatches: Match[]
}
