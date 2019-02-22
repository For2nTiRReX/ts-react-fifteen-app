import React from 'react';
import { PointsServiceService } from '../../services/points-service.service';
import { Points } from '../../models';
import DateFormatterService from '../../utils/date-formatter';

type State = {
    topScores: Array<Points>
}

class FifteenStatistic extends React.Component<{}, State> {

    
    pointsServiceService: PointsServiceService = new PointsServiceService();
    dateFormatterService = new DateFormatterService();

    constructor(props: any) {
        super(props);
        this.state = {
            topScores: []
        }
        this.getTableValues();
    }

    getTableValues() {
        this.pointsServiceService.getTopPlayers().then(
            (pointItem: Points[]) => {
                this.setState({
                    topScores: [...pointItem]
                });
            }
        );
    }

    displayTable() {
       if (this.state.topScores.length < 0) return '';
       return (
        <table className="table table-bordered">
            <tbody>
                <tr>
                    <th>№</th>
                    <th>Player</th>
                    <th>Time</th>
                    {/* <th>Moves</th> */}
                </tr>
                {   this.state.topScores.map((pointItem, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{ this.dateFormatterService.formatDate(pointItem.time) }</td>
                            <td>{pointItem.moves}</td>
                        </tr>
                    )
                }) }
            </tbody>
        </table>
       )
    }

    render() {
        return(
            <div>
                <h1 className="page-title">
                    Best results
                </h1>
                <div className="container">
                    {this.displayTable()}
                </div>
            </div>
        );
    }
    
}
export default FifteenStatistic;