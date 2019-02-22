import { Player } from "./player";

export interface RootState {
    player: Player | null; 
    isAuthenticated: boolean;
}