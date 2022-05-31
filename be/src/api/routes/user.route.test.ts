import app from '../../index';
import request from 'supertest';

describe('POST /user', () => {
  describe('/register', () => {
    test('good credentials', async () => {
      const response = await request(app).post('/user/register').send({
        email: 'supertest@gmail.com',
        firstName: 'test',
        lastName: 'lastname',
        password: '1Abcdef#'
      });

      expect(response.status).toBe(201);
    });
  });
});
