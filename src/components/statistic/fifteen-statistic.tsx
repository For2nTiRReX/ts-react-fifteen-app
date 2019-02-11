import React from 'react';

const FifteenStatistic = () => {
    return(
        <div>
            <h1 className="page-title">
            Best results
            </h1>
            <div className="container">
                <table className="table table-bordered">
                    <tr>
                        <th>№</th>
                        <th>Player</th>
                        <th>Time</th>
                        <th>Moves</th>
                    </tr>
                    {/* <tr *ngFor="let pointItem of topScores | async; let i = index">
                        <td>{{i + 1}}</td>
                        <td>{{pointItem.player ? pointItem.player.name : 'Unknown player'}}</td>
                        <td>{{pointItem.time | secondsToHours}}</td>
                        <td>{{pointItem.moves}}</td>
                    </tr> */}
                </table>
            </div>
        </div>
    );
}
export default FifteenStatistic;