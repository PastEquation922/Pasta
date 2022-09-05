import { CommandType } from "../Typings/Command";

export class Command {
    constructor(options: CommandType) {
        Object.assign(this, options)
    }
}