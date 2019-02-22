
import { Points, Player } from '../models/index';
import { v4 as uuid } from 'uuid';
import PouchDB from 'pouchdb';
import { from, Observable, of } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

export class PointsServiceService {

  private db: PouchDB.Database;

  constructor() {
      this.db = new PouchDB('fifteen_db_points');
  }

  public getTopPlayers( amount: number = 10 ) {
      return this.db.allDocs({
          include_docs: true,
          descending: true
      }).then( (result: any) => {
          if ( result.rows.length > 0 ) {
              return result.rows
                  .sort( ({doc: docA}: any, {doc: docB}: any) => {
                    return docA.moves - docB.moves;
                  })
                  .slice( 0, amount )
                  .map((dbItem:any) => {
                      const itemProps = dbItem.doc;
                      return new Points( itemProps._id, itemProps.moves, itemProps.time, itemProps.player_id );
                  });
          } else {
              return [];
          }
      }).catch( (err: string) => {
          console.log(err);
      });
  }


  public setDbResults( points: Points[] ) {
      return this.db.bulkDocs( points ).then( (result: any) => {
          console.log( 'Successfully posted !', result );
          return result;
      }).catch( (err: string) => {
          console.log(err);
      });
  }


  public getPlayerPoints(playerID: string): Observable<Points[]> {
    return from(
        this.db.allDocs({
        include_docs: true,
        descending: true,
    })).pipe(
        map(( {rows}: any ) => {
            return rows.map(({doc}: any) => doc).filter((points: Points)=> points.player_id === playerID)
        })
    )
  }

  public isPointsHaveToBeUpdated( row: Points, moves: number, time: number ): boolean {
    return ( moves < row.moves || time < row.time ) ? true : false;
  }

  public createTestDb(): void {
      const pointsArr = [];
      for ( let i = 0; i < 15; i++ ) {
          pointsArr.push( this.newPointsFactory(i, i + 25, uuid()) );
      }
      this.db.bulkDocs( pointsArr ).then( (result: any) => {
          console.log( 'Successfully posted !', result );
      }).catch( (err: string) => {
          console.log(err);
      });
  }

  public newPointsFactory(moves: number = 0, time: number = 0, player_id: string = ''): Points {
    return new Points(uuid(), moves, time, player_id);
  }
}


