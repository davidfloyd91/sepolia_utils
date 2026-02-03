import { Command } from "commander";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import z from "zod";
import tetherAbi from "../abis/tether.json";
import { USDT_CONTRACT_ADDRESS_SEPOLIA, USDT_DECIMALS } from "../constants";
import { envSchema } from "../schemas";

const claimTetherOptionsSchema = z.object({
  amount: z.string(),
});

const claimTether = (program: Command): Command => {
  return program
    .command("claim_tether")
    .description("Issue yourself Sepolia testnet USDT")
    .requiredOption(
      "--amount <number>",
      "the amount to send in whole dollars (max 999) (decimals automatically appended) (required)",
    )
    .action(async (options) => {
      const { amount } = claimTetherOptionsSchema.parse(options);

      const env = envSchema.parse(process.env);

      if (Number(amount) > 999) {
        console.error("amount can't be over 999");
        process.exit(1);
      }

      const rawPrivateKey = env.PRIVATE_KEY;
      let privateKey: `0x${string}`;

      // private key can include 0x prefix or not
      if (rawPrivateKey.slice(0, 2) === "0x") {
        privateKey = `0x${rawPrivateKey.slice(2)}`;
      } else {
        privateKey = `0x${rawPrivateKey}`;
      }

      const account = privateKeyToAccount(privateKey);
      const chain = sepolia;
      const transport = http(
        `https://sepolia.infura.io/v3/${env.INFURA_API_KEY}`,
      );

      const walletClient = createWalletClient({
        account,
        chain,
        transport,
      });

      const res = await walletClient.writeContract({
        abi: tetherAbi,
        account,
        address: USDT_CONTRACT_ADDRESS_SEPOLIA,
        args: [Number(amount) * 10 ** USDT_DECIMALS],
        functionName: "_giveMeATokens",
      });

      console.log({ res });
    });
};

export { claimTether };
