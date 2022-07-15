export const CreateTemplatesSchema = {
	description: 'Used to create a template',
	tags: ['templates'],
	summary: 'Creates a template',
	response: {
		200: {
			description: 'Successful response',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					_id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    eligiblity: { type: 'string' },
                    status: { type: 'boolean' }
				},
			}
		},
	},
};