export const CreateTemplatesSchema = {
	description: 'Used to create a template',
	tags: ['templates'],
	summary: 'Creates a template',
	body: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			description: { type: 'string' },
			eligiblity: { type: 'string' }
		},
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
					templateId: { type: 'string' },
					templateName: { type: 'string'},
                    createdNewTemplate: { type: 'boolean' }
				},
			}
		},
	}