import { Command } from "./Command";
import { Help } from "./Commands/Help";
import { Hug } from "./Commands/Hug";
import { SetLogChannel } from "./Commands/Utils/SetLogChannel";

export var commands: Command[] = [Help, Hug, SetLogChannel];