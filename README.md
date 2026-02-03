# sepolia_utils

```
cp .env.local.example .env.local # then populate vars
nvm use
pnpm i
```

Note that `PRIVATE_KEY` can include the `0x` prefix or leave it out, both cases are handled.

## claim_tether

Max is 999. Use dollar amounts, decimals are handled.

```
pnpm dev claim_tether --amount 999
```
