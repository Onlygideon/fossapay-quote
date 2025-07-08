import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('QuoteController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST quote (valid)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/quote')
      .send({ amount: 100, targetCurrency: 'NGN' })
      .expect(201);
    expect(res.body.outputAmount).toBeDefined();
  });

  it('/POST quote (invalid)', async () => {
    await request(app.getHttpServer())
      .post('/api/quote')
      .send({ amount: -50, targetCurrency: 'NGN' })
      .expect(400);
  });
});
