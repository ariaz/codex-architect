import * as dotenv from 'dotenv';
import { createCodexClient } from 'codex';
import * as T from '@effect-ts/core/Effect';
import { pipe } from '@effect-ts/core/Function';

dotenv.config();

const run = T.gen(function* (_) {
  const client = createCodexClient({
    apiKey: process.env.OPENAI_API_KEY || '',
  });

  // Example: Generate TypeScript project structure based on requirements
  const response: any = yield* _(
    client.generate({
      prompt: 'Generate a basic TypeScript project structure with ESLint and Prettier configuration.',
      model: 'codex-002',
      max_tokens: 1024,
    })
  );

  console.log(response.choices?.[0]?.text);
});

pipe(run, T.runPromise).catch((err) => {
  console.error('Error running Codex client:', err);
  process.exit(1);
});
