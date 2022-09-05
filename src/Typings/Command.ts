import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, Guild, GuildChannel, GuildMember, GuildTextBasedChannel, PermissionResolvable } from "discord.js";
import { XClient } from "../Structures/Client";

export interface XInteraction extends CommandInteraction {
    member: GuildMember,
    guild: Guild
}

interface RunOptions {
    client: XClient,
    interaction: XInteraction,
    args: CommandInteractionOptionResolver,
    guild: Guild,
    channel: GuildTextBasedChannel

}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    cooldown?: number;
    run: RunFunction;
} & ChatInputApplicationCommandData