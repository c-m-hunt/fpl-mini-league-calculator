interface EventData {
  event: number;
  points: number;
  total_points: number;
  rank: number;
  rank_sort: number;
  overall_rank: number;
  percentile_rank: number;
  bank: number;
  value: number;
  event_transfers: number;
  event_transfers_cost: number;
  points_on_bench: number;
}

interface PastSeasonData {
  season_name: string;
  total_points: number;
  rank: number;
}

export interface HistoryApiResponse {
  current: EventData[];
  past: PastSeasonData[];
  chips: any[]; // If you know the structure of chips, replace `any[]` with the correct type.
}

interface LeaguePhase {
  phase: number;
  rank: number;
  last_rank: number;
  rank_sort: number;
  total: number;
  league_id: number;
  rank_count: number;
  entry_percentile_rank: number;
}

interface League {
  id: number;
  name: string;
  short_name: string | null;
  created: string;
  closed: boolean;
  rank: number | null;
  max_entries: number | null;
  league_type: string;
  scoring: string;
  admin_entry: number | null;
  start_event: number;
  entry_can_leave: boolean;
  entry_can_admin: boolean;
  entry_can_invite: boolean;
  has_cup: boolean;
  cup_league: number | null;
  cup_qualified: boolean | null;
  rank_count: number | null;
  entry_percentile_rank: number | null;
  active_phases: LeaguePhase[];
  entry_rank: number | null;
  entry_last_rank: number | null;
}

interface CupMatch {
  id: number;
  entry_1_entry: number;
  entry_1_name: string;
  entry_1_player_name: string;
  entry_1_points: number;
  entry_1_win: number;
  entry_1_draw: number;
  entry_1_loss: number;
  entry_1_total: number;
  entry_2_entry: number;
  entry_2_name: string;
  entry_2_player_name: string;
  entry_2_points: number;
  entry_2_win: number;
  entry_2_draw: number;
  entry_2_loss: number;
  entry_2_total: number;
  is_knockout: boolean;
  league: number;
  winner: number | null;
  seed_value: number | null;
  event: number;
  tiebreak: string | null;
  is_bye: boolean;
  knockout_name: string;
}

interface CupStatus {
  qualification_event: number | null;
  qualification_numbers: number | null;
  qualification_rank: number | null;
  qualification_state: string | null;
}

interface Cup {
  matches: CupMatch[];
  status: CupStatus;
  cup_league: number | null;
}

interface Leagues {
  classic: League[];
  h2h: League[];
}

export interface ManagerApiResponse {
  id: number;
  joined_time: string;
  started_event: number;
  favourite_team: number | null;
  player_first_name: string;
  player_last_name: string;
  player_region_id: number;
  player_region_name: string;
  player_region_iso_code_short: string;
  player_region_iso_code_long: string;
  years_active: number;
  summary_overall_points: number;
  summary_overall_rank: number;
  summary_event_points: number;
  summary_event_rank: number;
  current_event: number;
  leagues: Leagues;
  cup: Cup;
  cup_matches: CupMatch[];
  name: string;
  name_change_blocked: boolean;
  entered_events: number[];
  kit: string | null;
  last_deadline_bank: number;
  last_deadline_value: number;
  last_deadline_total_transfers: number;
}

export type LeagueTable = {
  weeks: number[];
  managers: {
    id: number;
    name: string;
    teamName: string;
    totalPoints: number;
    totalRank: number;
    weeklyPoints: number[];
    weeklyRank: number[];
  }[];
};

export type Config = {
  managerIds: number[];
  weekNumbers: number[];
};
