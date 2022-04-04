# Join4Role

Just a little Discordbot to assign roles to members in a Voice Channel

## Setup
To setup the Bot you basically just need to fill in all informations in the `config.json` file. Here's a little explanation what the different informations are for:

**Token:**
    That your Bot can connect to Discord you need to get your Token. Just create a Bot on the [Discord Developer Portal](https://discordapp.com/developers/applications/me) and copy the Token.

**Role:**
    `role` is the role ID you want to assign to the members if they join a Voice Channel. 

**Ignore Channel**
    ID of the Stage channel

**Cooldown**
    Cooldown for the bot to not reach the API limit of Discord. We recommend to set it larger than four seconds. Please note that the time must be given in miliseconds.