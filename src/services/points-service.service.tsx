
import { Points, Player } from '../models/index';
import { v4 as uuid } from 'uuid';
import * as $PouchDB from 'pouchdb';
import { PlayerServiceService } from './player-service.service';

export class PointsServiceService {
/*
  private db: any;
  private points: Points;
  private player: Player;

  constructor(public playerServiceService: PlayerServiceService) {
      this.db = new PouchDB('fifteen_db_points');
      this.playerServiceService.getPlayer().subscribe( player => {
          if (player instanceof Player) {
              this.player = player
          }
      } );
  }

  public getTopPlayers( amount: number ) {
      return this.db.allDocs({
          include_docs: true,
          descending: true
      }).then( (result) => {
          if ( result.rows.length > 0 ) {
              return result.rows
                  .sort( (a, b) => {
                    return a.doc.moves - b.doc.moves;
                  })
                  .slice( 0, amount )
                  .map((dbItem) => {
                      const itemProps = dbItem.doc;
                      return new Points(itemProps._id, itemProps.moves, itemProps.time, itemProps.player_id, itemProps.player);
                  });
          } else {
              return [];
          }
      }).catch( (err) => {
          console.log(err);
      });
  }

  public setNewResult( moves: number, time: number ) {
      let haveToBeUpdated = '';
      return this.db.allDocs({
          include_docs: true,
          descending: true,
      }).then( (result) => {
          haveToBeUpdated = this.isPointsHaveToBeUpdated( result.rows, moves, time );
          if ( haveToBeUpdated ) {
              this.points = new Points( haveToBeUpdated, moves, time, this.player._id, this.player );
              this.updatePlayerResults( this.points, haveToBeUpdated );
          }
      }).catch((err) => {
          console.log(err);
      });
  }

  private updatePlayerResults( points: Points, uuid: string = '' ) {
      return this.db.put( points ).then( (result) => {
          console.log( 'Successfully posted !', result );
          return result;
      }).catch( (err) => {
          console.log(err);
      });
  }


  private isPointsHaveToBeUpdated( dbRows, moves, time ): string {
      for ( let i = 0; i < dbRows.length; i++) {
          const row = dbRows[i].doc;
          if ( row.player_id === this.player._id ) {
              if ( moves < row.moves || time < row.time )  {
                  this.db.remove(row);
                  return row._id;
              } else {
                  return '';
              }
          }
      }
      return uuid();
  }

  public createTestDb() {
      const pointsArr = [];
      for ( let i = 0; i < 15; i++ ) {
          pointsArr.push( new Points( uuid(), i, i + 25, uuid() ) );
      }
      this.db.bulkDocs( pointsArr ).then( (result) => {
          console.log( 'Successfully posted !', result );
      }).catch( (err) => {
          console.log(err);
      });
  }*/
}
