import { appConfig } from '@config/app.config';
import { App } from './app';

async function main() {
  const app = new App();
  await app.init();
  await app.listen(appConfig.port);

  // eslint-disable-next-line no-console
  console.log(`✅ - Server is listening to http://localhost:${appConfig.port}`);
}

main();
