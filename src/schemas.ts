import z from "zod";

const envSchema = z.object({
  INFURA_API_KEY: z.string(),
  PRIVATE_KEY: z.string(),
});

export { envSchema };
