
import { Points, Player } from '../models/index';
import { v4 as uuid } from 'uuid';
import PouchDB from 'pouchdb';
import { from, Observable, of } from 'rxjs';
import { map, filter, tap, switchMap } from 'rxjs/operators';

export class PointsServiceService {

    private db: PouchDB.Database;

    constructor() {
        this.db = new PouchDB('fifteen_db_points');
    }

    public getTopPlayers(amount: number = 10): Observable<Points[]> {
        return from(this.db.allDocs({
            include_docs: true,
            descending: true
        })).pipe(
            map(({ rows }) => {
                return rows
                .map(({doc}: any) => doc)
                .sort((docA: any, docB: any) => {
                    return docA.moves - docB.moves;
                })
                .slice(0, amount)
            })
        )
    }

    public setDbResults(points: Points[]): Observable<any> {
        return from(this.db.bulkDocs(points));
    }

    public getPlayerPoints(playerID: string): Observable<Points> {
        return from(
            this.db.allDocs({
                include_docs: true,
                descending: true,
            })).pipe(
                switchMap(({ rows }) => from(rows)),
                map(({ doc }) => doc),
                filter((points: any) => points.player_id === playerID)
            )
    }

    public isPointsHaveToBeUpdated(row: Points, moves: number, time: number): boolean {
        return (moves < row.moves || time < row.time) ? true : false;
    }

    public createTestDb(): void {
        const pointsArr = [];
        for (let i = 0; i < 15; i++) {
            pointsArr.push(this.newPointsFactory(i, i + 25, uuid()));
        }
        this.db.bulkDocs(pointsArr).then((result: any) => {
            console.log('Successfully posted !', result);
        }).catch((err: string) => {
            console.log(err);
        });
    }

    public newPointsFactory(moves: number = 0, time: number = 0, player_id: string = ''): Points {
        return new Points(uuid(), moves, time, player_id);
    }

}


