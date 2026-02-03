import { Command } from "commander";
import dotenv from "dotenv";
import { claimTether } from "./commands";
import { envSchema } from "./schemas";

dotenv.config({ path: ".env.local", quiet: true });
envSchema.parse(process.env);

const program = new Command()
  .name("sepolia_utils")
  .description("Commands to help testnet development")
  .version("1.0.0");

claimTether(program);

program.parse();
