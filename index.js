// Require important things
const { Client, Intents } = require('discord.js');
const config = require('./config.json');

// config.cooldown HAS TO BE specified in milliseconds
const cooldown = config.cooldown;
var lastUserJoined;

// Util
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Set all Intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });

// Send message to console
client.on('ready', () => {
	console.log(`[LOG] Connected to Discord with client ${client.user.tag}`);
	client.user.setActivity(`all Voice Channels 👀`, { type: 'WATCHING' }); //Set Activity
});

client.on('voiceStateUpdate', async (oldState, newState) => {
	console.log('EVENT FIRED');
	let newChannel = newState.voiceChannel;
	let oldChannel = oldState.voiceChannel;

	const member = newState.member;

	// ping role
	const roleID = config.role;
	const role = newState.guild.roles.cache.find(r => r.id === roleID); // just use the VoiceState object itself

	if (!role) throw new Error(`Wasn't able to find role (${roleID}) `)

	if(newChannel?.id) { // false if id is undefined
		console.log('[LOG] Joined channel');
		// connect event
		if (newChannel.id != config.ignore_channel) { // id must exist at this point
			// escape ignored channel
			// add role

			console.log('[LOG] Joined not ignored channel');

			// if timespan between user joining and right now is less than the cooldown, wait it out (custom sleep function);
			/* if (Date.now() - lastUserJoined < cooldown) {
				console.log('[LOG]  Cooldown triggered');
				await sleep(cooldown); // should make script wait for specified cooldown
			} */

			try {
				member.roles.add(role.id);
				lastUserJoined = Date.now();
				console.log('[LOG] Added role');
			} catch (error) {
				console.log(`[ERROR] Wasn't able to add role \`${role.name}\` to member (${member.user.tag})`);
			}
			
		} else return; // channel IS ignored channel
	} 
	// disconnect event
	else { // lass mal
		console.log('[LOG] Disconnect event?');
		if (oldChannel.id === config.ignore_channel) return; // return if previous channel was ignored 

		try {
			member.roles.remove(role.id);
			console.log('[LOG] Removed role');
		} catch (error) {
			console.log(`[ERROR] Wasn't able to remove role \`${role.name}\` from member (${member.user.tag})`);
		}
	}
});

// Connect client to Discord
client.login(config.token);





// old try


/* client.on('voiceStateUpdate', (oldState, newState) => {
	let newChannel = newState.voiceChannelID;
	let oldChannel = oldState.voiceChannelID;

	// poor man's debug
	console.log(`[DEBUG] newChannel: ${newChannel.id}`);
	console.log(`[DEBUG] oldChannel: ${oldChannel.id}`);

	//Check if channel is Stage
	if (newChannel !== oldChannel) {

		let roleId = config.role;
		let role = newState.guild.roles.cache.find(r => r.id === roleId);
		if (!role) throw new Error(`[ERROR] Couldn't find role to assign: ${config.role}`); // throw exits

		if (newChannel.id != config.ignore_channel) { // Rolle wird geadded wenn: neuer Kanal =! Voice
			// user joined channel
			try {
				newState.member.roles.add(role);
			} catch (error) {
				console.log('[LOG] Failed to add role to user');
			}

		} else if (newChannel.id !== config.ignore_channel) { // die rolle wird dann aber nicht removed, wenn man aus einem vc in die stage geht?
			// Execute this if user left 
			try {
				newState.member.roles.remove(role);
			} catch (error) {
				console.log(`[LOG] Failed to remove role \`${config.role}\` from user`);
			}
			

		}
	}
}); */