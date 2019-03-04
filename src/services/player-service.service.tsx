import { v4 as UUID } from 'uuid'
import PouchDB from 'pouchdb';
import { from, Observable } from 'rxjs';
import { Player, DbDocPlayer } from '../models';
import { map, switchMap } from 'rxjs/operators';

export class PlayerServiceService {

    private db: PouchDB.Database;

    constructor() {
        this.db = new PouchDB('fifteen_db_players');
    }

    public getPlayers(): Observable<DbDocPlayer> {
        return from(
            this.db.allDocs({
                include_docs: true,
                descending: true,
            })).pipe(
                switchMap(({ rows }) => from(rows)),
                map(({ doc }) => doc as DbDocPlayer),
            )
    }

    public getPlayer(userId: string): Observable<DbDocPlayer> {
        return from(this.db.allDocs({
            include_docs: true,
            startkey: userId,
            endkey: userId
        })).pipe(
            switchMap(({ rows }) => from(rows)),
            map(({ doc }) => doc as DbDocPlayer),
        );
    }

    public loginUser(userLogin: string): Observable<DbDocPlayer> {
        return from(this.db.allDocs({
            include_docs: true
        })).pipe(
            switchMap((result: any) => {
                if (result.rows.length < 1 || !this.isUserExist(result.rows, userLogin)) {
                    return this.createNewUser(userLogin).pipe(
                        switchMap(([createdUser]) => {
                            return this.getPlayer(createdUser.id);
                        }
                    ));
                } 
                const existUser = result.rows.find((item: any) => item.doc.name === userLogin);
                return this.getPlayer(existUser.id || '');
            }))
    }

    private createNewUser(userLogin: string): Observable<any> {
        const uuid = UUID();
        const player = new Player(uuid, userLogin);
        return from(this.db.bulkDocs([player]));
    }



    private isUserExist(dbRows: any, userLogin: string): boolean {
        return dbRows.some( (row: any) => userLogin === row.doc.name );
    }
}