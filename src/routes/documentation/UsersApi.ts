export const AddUserSchema = {
	description: 'Create a new User',
	tags: ['user'],
	summary: 'Creates new User with given values',
	body: {
		type: 'object',
		properties: {
			firstname: { type: 'string' },
			lastname: { type: 'string' },
			email: { type: 'string' },
			gender: { type: 'string'},
		},
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				_id: { type: 'string' },
				firstname: { type: 'string' },
				lastname: { type: 'string' },
				email: {type: 'string'}
			},
		},
	},
};

