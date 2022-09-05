import { EmbedBuilder } from "discord.js";
import { request } from "undici";
import { Command } from "../../Structures/Command";

async function getJSONResponse(body) {
	let fullBody = '';

	for await (const data of body) {
		fullBody += data.toString();
	}

	return JSON.parse(fullBody);
}

export default new Command({
    name: "cat",
    description: "Get a cute cat!",
    run: async({ interaction, guild }) => {
        const catResult = await request('https://api.thecatapi.com/v1/images/search')
        let r = await getJSONResponse(catResult.body);
        r = r.find(obj => {
            return obj.url;
        })
        const catbed = new EmbedBuilder()
        .setTitle('Cute cat')
        .setImage(r.url)
        .setColor('Random')
        .setFooter({
            text: "Pasta cats"
        })

        interaction.reply({ embeds: [catbed] })
    },
})