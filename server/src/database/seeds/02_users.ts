import {Knex} from 'knex'
import { faker } from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
	await knex('users').del()

	const users = []
	const numberOfUsers = 10

	const existingModelsIds = await knex('countries').pluck('id')

	for (let i = 0; i < numberOfUsers; i++) {
		users.push({
			modelId: existingModelsIds[faker.number.int({min: 0, max: 9})],
			email: faker.internet.email(),
			name: faker.person.firstName(),
			surname: faker.person.lastName(),
			phoneNumber: faker.phone.number('###-###-###'),
			profilePicture: faker.internet.avatar(),
			password: faker.internet.password(),
			salt: faker.number.int().toString(),
			sessionToken: faker.number.int().toString(),
		})
	}
	await knex('users').del()
	await knex('users').insert(users)
}
