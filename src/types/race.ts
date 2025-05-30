import { ActionContext } from 'vuex';

export interface Horse {
  id: number;
  name: string;
  condition: number;
  color: string;
}

export interface RaceRound {
  roundNumber: number;
  distance: number;
  horses: Horse[];
  results?: RaceResult[];
  isCompleted: boolean;
  isActive: boolean;
}

export interface RaceResult {
  position: number;
  horse: Horse;
  time: number;
}

export interface RacePosition {
  [horseId: number]: number;
}

export interface RoundItemProps {
  currentPositions?: RacePosition;
  round: RaceRound;
  showTime: boolean;
  showStatus: boolean;
  horseTimes?: RacePosition;
}

export interface RaceProgram {
  rounds: RaceRound[];
  currentRound: number;
  isGenerated: boolean;
}

export interface RaceState {
  horses: Horse[];
  program: RaceProgram;
  isRacing: boolean;
  racePositions: RacePosition;
  completedRounds: number;
  savedHorseSpeeds: RacePosition;
  currentRoundHorseTimes: RacePosition;
  activeRoundIndex: number;
}

export interface RaceActionPayload extends ActionContext<RaceState, any> {
  commit: ActionContext<RaceState, any>['commit'];
  state: RaceState;
  dispatch: ActionContext<RaceState, any>['dispatch'];
}
