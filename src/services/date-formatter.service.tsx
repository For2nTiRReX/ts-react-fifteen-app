export default class DateFormatterService {
    formatDate = (amountOfSecconds: number): string => {
        let hours: number = Math.floor(amountOfSecconds / 3600);
        let minutes: number = Math.floor((amountOfSecconds - (hours * 3600)) / 60);
        let seconds: number = amountOfSecconds - (hours * 3600) - (minutes * 60);
    
        var time = this.addZero(hours) + ':' + this.addZero(minutes) + ':' + this.addZero(seconds);
        return time;
      }
    
    private addZero(numbValue: number): string {
        let add = "";
        if (numbValue < 10) 
            add = "0";
        
        return add + numbValue;
    }
} 