import request from 'supertest';
import { App } from '../src/app';

jest.mock('../src/shared/infra/typeorm');

describe('App Integrations tests', () => {
	let app: App;
	beforeAll(async () => {
		app = new App();

		await app.init();
		await app.listen();
		console.log('FInishhhh');
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
					expect(body).toMatchObject({
						response: 1,
					});
				});
		});
	});

	afterAll(async () => {
		await app.close();
	});
});
