import request from 'supertest';
import * as faker from 'faker';
import { HttpStatus } from '@shared/enums/http-status.enum';
import { App } from '@shared/infra/http/app';
import { aUUID, aISODate } from './helpers/matchers.helper';

jest.mock('../shared/infra/typeorm');

describe('App Integrations tests', () => {
  let app: App;
  beforeAll(async () => {
    app = new App();

    await app.init();
    await app.listen();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should be health', () => {
    return request(app.getServer())
      .get('/')
      .expect('Content-Type', /json/)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          health: true,
        });
      });
  });

  describe('Users', () => {
    describe('POST /users - Create User', () => {
      it('should able to create user', () => {
        return request(app.getServer())
          .post('/users')
          .send({
            name: 'Dante',
            email: 'naguadtl@gmail.com',
            password: 'dante',
          })
          .expect('Content-Type', /json/)
          .expect(HttpStatus.CREATED)
          .expect(({ body }) => {
            expect(body).toEqual({
              avatar: null,
              created_at: expect.stringMatching(aISODate),
              email: 'naguadtl@gmail.com',
              id: expect.stringMatching(aUUID),
              name: 'Dante',
              updated_at: expect.stringMatching(aISODate),
            });
          });
      });
    });

    describe('PATCH /users - Update User', () => {
      it('should return 404(Not Found) when user does not exist', () => {
        return request(app.getServer())
          .patch(`/users/${faker.random.uuid()}`)
          .send({
            name: 'Update',
          })
          .expect('Content-Type', /json/)
          .expect(HttpStatus.NOT_FOUND)
          .expect(({ body }) => {
            expect(body).toMatchObject({
              message: 'User not founds',
              name: 'NotFoundError',
            });
          });
      });
    });
  });

  afterAll(async () => {
    console.log('Finaklizando la conneccion', app.typormConnection.isConnected);
    await app.close();
    console.log('Finalizando la conneccion', app.typormConnection.isConnected);
  });
});
