import React from 'react';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Subscription } from 'rxjs/Subscription';
import DateFormatterService from '../../../utils/date-formatter';

type State = {
    seconds: number,
}

export default class FifteenTimeCounter extends React.Component<{}, State> {

    private dateFormatterService: DateFormatterService;
    private subscription: Subscription | null;

    constructor(props: any) {
        super(props);
        this.state = {
            seconds: 0,
        }
        this.dateFormatterService = new DateFormatterService();
    }

    componentWillUnmount() {
        this.stop();
    }

    render() {
        return (
            <div className="time-holder"> { this.dateFormatterService.formatDate(this.state.seconds) } </div>
        );
    }

    get isRunning(): boolean {
        return Boolean(this.subscription);
    }

    start(): void {
        if (this.isRunning) {
            return;
        }
        this.subscription = IntervalObservable.create(1000).subscribe(() => {
            this.setState((state) => {
                return {
                    seconds: state.seconds + 1
                }
            });
        });
    }

    stop(): void {
        if (!this.isRunning) {
            return;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    reset = () => {
        this.setState({
            seconds: 0
        });
    }

    getTime = () => {
        return this.state.seconds;
    }

    getTimeSeconds = (): number => {
        return this.state.seconds;
    }

    toggleState = ($event: any) => {
        if ($event) {
            this.start();
        }
        else {
            this.stop();
        }
    }
    
}
