import {RiotService} from '../games/riot/riot.service';
import {Party} from './party';
import * as constants from './../config.constants';
import * as logger from './../utils/console.utils'


export class PartyService{

    constructor(){
        this.parties = new Array();
        this.riotService = new RiotService();
    }

    initParties(members){
        members.forEach(member => {
            const game = member.presence.game;
            if(game != null && constants.supportedGames.includes(game.name.toLowerCase())){
                this.checkStateGame(member, false);
            }
        });
    };

    history(oldMember){
        console.log("history");
    };

    checkStateGame(member, displaying) {
        var partyFound = false;
        const game = member.presence.game;

        this.parties.forEach(party =>{
            if(party.game === game){
                partyFound=true;
                party.addPlayer(member);
            }
        });

        if(!partyFound){
            console.log(game);
            
            console.debug('New party {member:'+member.displayName +', game:'+game +'}');
            
            switch (game.name.toLowerCase()) {
                case constants.supportedGames[0]:
                    if(this.riotService.checkStateGame(game)){
                        var partyInfo = this.riotService.getPartyInfo();
                        partyFound = true;
                    }
                    break;
                case constants.supportedGames[1]:
                    logger.info("comes soon");
                    break;
                case constants.supportedGames[2]:
                    logger.info("comes soon");
                    break;
                default:
                    logger.error("No service for the game : ["+ game.name +"]")
                    break;
            }
            if(partyFound){
                const party = new Party(member, game);
                this.parties.push(party);
            }
        }
    }    

    presenceEvent(oldMember, newMember){
        const oldGame = oldMember.presence.game;
        const newGame = newMember.presence.game;

        if(oldGame != null && this.supportedGames.includes(oldGame)){
            this.history(oldMember);
        }
        if(newGame != null && this.supportedGames.includes(newGame)){
            this.checkStateGame(newMember, true);
        }
    }
}