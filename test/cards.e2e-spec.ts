import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('CardsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // We apply the same global pipes as main.ts to trigger DTO validation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /cards/validate', () => {
    it('should return 200 and { valid: true } for a valid card number', async () => {
      const response = await request(app.getHttpServer())
        .post('/cards/validate')
        .send({ cardNumber: '4111111111111111' })
        .expect(200);

      expect(response.body).toEqual({ valid: true });
    });

    it('should return 200 and { valid: false } for an invalid Luhn card number', async () => {
      const response = await request(app.getHttpServer())
        .post('/cards/validate')
        .send({ cardNumber: '4111111111111112' })
        .expect(200);

      expect(response.body).toEqual({ valid: false });
    });

    it('should return 400 when cardNumber is missing', async () => {
      await request(app.getHttpServer())
        .post('/cards/validate')
        .send({}) 
        .expect(400);
    });

    it('should return 400 when cardNumber is of wrong type (e.g., number)', async () => {
      await request(app.getHttpServer())
        .post('/cards/validate')
        .send({ cardNumber: 4111111111111111 }) 
        .expect(400);
    });

    it('should handle formatted card numbers with spaces and hyphens correctly', async () => {
      const response = await request(app.getHttpServer())
        .post('/cards/validate')
        .send({ cardNumber: '4111-1111 1111-1111' })
        .expect(200);

      expect(response.body).toEqual({ valid: true });
    });
  });
});
