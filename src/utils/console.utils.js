import { getDefaultSettings } from "http2";

export function info(log) {
    console.log(getFormatedDate() + "[SYSTEM] "+log);
}

export function error(log) {
    console.error(getFormatedDate() +"[ERROR] "+log);
}

export function debug(log) {
    if(debugMode){
        console.debug(getFormatedDate() +"[DEBUG] "+log);
    }
}

function getFormatedDate(){

    Date.prototype.dateAndHoures = function() {
        const MM = this.getMonth() + 1; // getMonth() is zero-based
        const dd = this.getDate();
        const hh = this.getHours();
        const mm = this.getMinutes();
        const ss = this.getSeconds();

        const date = [(dd>9 ? '' : '0') + dd,
        (MM>9 ? '' : '0') + MM,
        this.getFullYear()
       ].join('/');
        
       const houres = [(hh>9 ? '' : '0') + hh,
        (mm>9 ? '' : '0') + mm,
        (ss>9 ? '' : '0') + ss
       ].join(':');
      
        return  date+ ' '+ houres;
    };

    const date = new Date();
    return '[' +date.dateAndHoures()+ ']';
}

export var debugMode = false;
