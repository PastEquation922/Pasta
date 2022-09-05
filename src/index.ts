require('dotenv').config();
import { XClient } from "./Structures/Client";
import { promisify } from "util";
import { glob } from "glob";

const globPromise = promisify(glob);


export const client = new XClient();
client.start()