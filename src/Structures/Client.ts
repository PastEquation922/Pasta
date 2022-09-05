import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
    GatewayIntentBits,
    Partials
} from "discord.js";
import { CommandType } from "../typings/Command";
import { glob } from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../typings/client";
import { Event } from "./Event";
import { readdir, readFile } from "fs";
import path = require('path');
import { Command } from "./Command";
import { connect } from 'mongoose';
import { guildId } from "../config";

const globPromise = promisify(glob);

export class XClient extends Client {
    commands: Collection<string, CommandType> = new Collection();

    constructor() {
        super({ intents: [
          GatewayIntentBits.DirectMessages,
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildBans,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildMembers
        ], partials: [Partials.Channel] });
    }

    start() {
        this.registerModules();
        this.login(process.env.botToken);
        connect("mongodb://localhost:27017/pasta");
    }
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            guildId.forEach(guild => {
                this.guilds.cache.get(guild).commands.set(commands)
            });
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands");
        }
    }

    async readFiles(dirname, onFileContent, onError) {
        readdir(dirname, function(err, filenames) {
          if (err) {
            onError(err);
            return;
          }
          filenames.forEach(function(filename) {
            readFile(dirname + filename, 'utf-8', async function(err, content) {
              if (err) {
                onError(err);
                return;
              }
              onFileContent(filename, content);
              

            });
          });
        });
      }

    

    async registerModules() {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
       
        const commands = glob(`D:/dev/PastaV2/Pasta/src/Commands/**/*.ts`, async function (err, files) {
          files.forEach(async file => {
            const command: CommandType = await importCommandFile(file);
            if(!command.name) return;
            
            client.commands.set(command.name, command);
            slashCommands.push(command);
          });
        })

        this.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: guildId
            });
        });

        const client = this;

        // Event
        const events = glob(`D:/dev/PastaV2/Pasta/src/events/**/*.ts`, async function (err, files) {
          files.forEach(async file => {
              const event: Event<keyof ClientEvents> = await importEventFile(file);
              client.on(event.event, event.run)

          });
        })
    }
}

async function importEventFile(fp: string): Promise<Event<keyof ClientEvents>> {
    return (await import(fp))?.default;
}

async function importCommandFile(fp: string): Promise<CommandType> {
    return (await import(fp))?.default;
}
