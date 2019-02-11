import { v4 as UUID } from 'uuid'
import PouchDB from 'pouchdb';
import { ReplaySubject } from 'rxjs';
import { Player } from '../models';

export class PlayerServiceService {

    private playerSubject = new ReplaySubject(1);
    private player: Player;
    private db: any;

    constructor() {
        this.db = new PouchDB('fifteen_db');
        let localStorageUser =  localStorage.getItem('player') ? localStorage.getItem('player') : '';
        if(localStorageUser) {
            this.player =  JSON.parse(localStorageUser);
            this.loginUser(this.player.name);
        }
    }

    public getPlayer() {
        return this.playerSubject;
    }

    public loginUser( userLogin: string ): Promise<Player> {
        const userPromise = this.db.allDocs({
            include_docs: true
        }).then( (result: any) => {
            if ( result.rows.length < 1 && !this.isUserExist( result.rows, userLogin ) ) {
                return this.createNewUser( userLogin ).then((createdUser: any) => {
                    return this.getUserFromDb( createdUser.id );
                });
            } else {
                return this.getUserFromDb( result.rows.find((item: any) => item.doc.name === userLogin ).id );
            }
        }).catch( (err: any) => {
            console.log(err);
        });
        return userPromise;
    }

    private createNewUser( userLogin: string ) {
        const uuid = UUID();
        this.player = new Player( uuid, userLogin );
        this.playerSubject.next( this.player );
        return this.db.put( this.player).then(function (result:any) {
            console.log( 'Successfully posted !', result );
            return result;
        }).catch(function (err:any) {
            console.log(err);
        });
    }

    private getUserFromDb( userId: string ): Promise<Player> {
        return this.db.allDocs({
            include_docs: true,
            startkey: userId,
            endkey: userId
        }).then( (result:any) => {
            this.player = new Player( result.rows[0].doc._id, result.rows[0].doc.name );
            this.playerSubject.next( this.player );
            localStorage.setItem('player', JSON.stringify(this.player));
            return this.player;
        }).catch(function (err:any) {
            console.log(err);
        });
    }

    private isUserExist( dbRows:any, userLogin:string ): boolean {
        return dbRows.some(function(row:any) {
            return userLogin === row.doc.name;
        });
    }
}