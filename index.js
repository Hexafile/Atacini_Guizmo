import * as logger from './src/utils/console.utils'

const config = require('./config.json');
const discord = require('discord.js');
const readline = require('readline');
const party = require('./src/party/party.service')

const bot = new discord.Client();
const partyService = new party.PartyService();

const rl = readline.createInterface({
    input: process.stdin
});

logger.info("Starting...");

bot.login(config.token);

bot.on('ready', ()=> {
    logger.info("List of active guilds :")

    let allActiveMembers = new Array();
    const guilds = bot.guilds.array();
    guilds.forEach(guild =>{
        if(guild.available){
            console.log("-- "+guild.name+" --");
            const members = guild.members.array();
            //!\
            //allActiveMembers = allActiveMembers.concat(members.filter(member=>isActive(member)));
            allActiveMembers = allActiveMembers.concat(members.filter(member=>member.presence.status != 'offline'));
        }
    });
    partyService.initParties(allActiveMembers);
    logger.info("Started");

});

bot.on('message', message => {
    const msg = message.content.toLowerCase();
    switch(msg){
    case 'ping':
        const ping = Math.round((new Date - message.createdTimestamp) /100);
        message.reply("pong - "+ ping + " ms");
    break;
    case 'guyzmo':
    case 'guizmo':
    case 'gyzmo':
        message.channel.send("Je suis comme du beurre putain !");
        if(msg !== 'guyzmo'){
            message.channel.send("Et c'est **Guyzmo** bâtard ! Pas **"+msg+"** !");
        }
    break;
    }
});

bot.on('presenceUpdate', (oldMember, newMember) =>{
    if(isActive(newMember)){
        partyService.presenceEvent(oldMember, newMember);
    }
})

function isActive(member){
    return member.voiceChannel != null && member.voiceChannelID != member.guild.afkChannelID;
}

rl.on('line', (input)=>{
    if(input.startsWith('users')){
        const args = input.split(' ');

        const guilds = bot.guilds.array();
        guilds.forEach(guild =>{
            if(guild.available){
                console.log("-- "+guild.name+" --");
                let members = guild.members.array();
                if(args[1] === '--online'){
                    members = members.filter(member=>member.presence.status != 'offline');
                }else if(args[1] === '--active'){
                    members = members.filter(member=>isActive(member));
                }
                members.forEach(member =>{
                    const voiceChannel= member.voiceChannel!==undefined?member.voiceChannel.name:"";
                    console.log("  "+member.displayName+" "+member.presence.game+ " "+voiceChannel);
                });
            }
        });
    }
    if(input.startsWith('debugmode')){
        logger.debugMode=!logger.debugMode;
    }
})