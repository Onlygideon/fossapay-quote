import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  (async () => {
    const url = 'https://fossapay-quote.onrender.com';
    const interval = 300000;

    async function reloadServer() {
      try {
        const response: { status: number } = await axios.get(url);
        console.log(
          `Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`,
        );
      } catch (error) {
        const err = error as Error;
        console.error(
          `Error reloading at ${new Date().toISOString()}:`,
          err.message,
        );
      }
    }

    setInterval(reloadServer, interval);
  })();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
