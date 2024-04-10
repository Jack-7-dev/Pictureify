import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ]
});

client.login(process.env.DISCORD_TOKEN);

const pingCommand = new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!");

client.on("ready", (x) => {
    client.user.setActivity("Picturify", { type: "WATCHING" });
    client.application.commands.create(pingCommand);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
    }
});