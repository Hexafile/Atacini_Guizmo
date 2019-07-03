import * as RiotConstant from './riot.constants';
import * as WebUtils from './../../utils/web.utils';
import {GameService} from './../game.service';

export class RiotService extends GameService{



    constructor(){
        super('RGAPI-0d3c6d4f-3282-4339-aa45-c6701163ca0b');
    }

    checkStateGame(game){
        return RiotConstant.IN_GAME === game.state;
    }

    getPartyInfo(){
        const path = RiotConstant.URL_MATCH_INFO.replace('{matchId}', 3);
        WebUtils.get(RiotConstant.HOST , path+this.getAuthPath());
    }

    getAuthPath(){
        return '?'+RiotConstant.API_QUERY+this.token;
    }
        
}