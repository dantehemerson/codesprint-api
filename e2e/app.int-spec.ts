import request from 'supertest';
import { App } from '../src/app';
import { aUUID, aISODate } from './helpers/matchers.helper';

jest.mock('../src/shared/infra/typeorm');

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

	it('should be listening', () => {
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
		it('should create user', () => {
			return request(app.getServer())
				.post('/users')
				.send({
					name: 'Update',
					email: 'naguadtl@gmail.com',
					password: 'dante',
				})
				.expect('Content-Type', /json/)
				.expect(({ body }) => {
					expect(body).toEqual({
						avatar: null,
						created_at: expect.stringMatching(aISODate),
						email: 'naguadtl@gmail.com',
						id: expect.stringMatching(aUUID),
						name: 'Update',
						updated_at: expect.stringMatching(aISODate),
					});
				});
		});
	});

	afterAll(async () => {
		await app.close();
	});
});
