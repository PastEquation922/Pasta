require('dotenv').config();
import { XClient } from "./Structures/Client";


export const client = new XClient();
client.start()