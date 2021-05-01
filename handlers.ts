import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as uniqid from 'uniqid';
import * as say from 'say';


export function ready(client: Discord.Client): void {
    console.log(`Bot ${client.user.username} is ready!`);
}


export async function initMessages(client: Discord.Client, message: Discord.Message): Promise<void> {
    const prefix: string = process.env.MESSAGE_PREFIX || '';

    if (message.content.startsWith(`${prefix}p`)) {
        // get user channel
        if (!message.member.voice.channel) {
            return;
        }

        // bot connection
        const connection: Discord.VoiceConnection = await message.member.voice.channel.join();
        console.log(`Bot is called to the voice channel!`);

        // bot disconnection
        setTimeout(() => {
            if (!message.member.voice.channel) {
                connection.disconnect();
                console.log(`Bot is disconnected from voice channel!`);
            }
        }, 10000);

        // message processing
        const index: number = message.content.indexOf(' ');
        if (index == -1) return;
        const text: string = message.content.slice(index + 1);
        const id: string = uniqid();

        // sound tmp file creating
        const fileName: string = `${__dirname}/voices/${id}.wav`;
        console.log(`Creating ${fileName} sound.`);
        say.export(text, null, null, fileName, error => {
            if (error) {
                console.log(error);
                return;
            }

            // playing sound and removing tmp file
            connection.play(fs.createReadStream(fileName));
            fs.unlinkSync(fileName);
        });
    }
}

