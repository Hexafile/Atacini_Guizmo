export class Party{

    constructor(member, game){
        this.players = new Array();
        this.players.push(member);
        this.game = game;
        if(game.party != null){
            this.partyId = game.party.id;
        }
    }
}