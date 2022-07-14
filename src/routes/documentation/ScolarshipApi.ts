export const AddScolarshipSchema = {
	description: 'Create a new scolarship',
	tags: ['scolarship'],
	summary: 'Creates new scolarship with given values',
	body: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			description: { type: 'string' },
			eligiblity: { type: 'string' },
			status: { type: 'boolean' }
		},
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				_id: { type: 'string' },
				name: { type: 'string' },
				description: { type: 'string' },
				eligiblity: { type: 'string' },
				status: { type: 'boolean' }
			},
		},
	},
};

export const PutScolarshipSchema = {
	description: 'Updates existing scolarship',
	tags: ['scolarship'],
	summary: 'Updates scolarship by Id with given values',
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'Scolarship Id'
			}
		}
	},
	body: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			description: { type: 'string' },
			eligiblity: { type: 'string' },
			status: { type: 'boolean' }
		},
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				_id: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
                eligiblity: { type: 'string' },
                status: { type: 'boolean' }
			},
		},
	},
};

export const GetScolarshipSchema = {
	description: 'Gets a single scolarship details',
	tags: ['scolarship'],
	summary: 'Gets scolarship by Id',
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'Scolarship Id'
			}
		}
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				_id: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
                eligiblity: { type: 'string' },
                status: { type: 'boolean' }
			},
		},
	},
};

export const GetScolarshipsSchema = {
	description: 'Gets all scolarships',
	tags: ['cars'],
	summary: 'Gets all scolarships',
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

export const DeleteScolarshipSchema = {
	description: 'Deletes a single scolarship',
	tags: ['cars'],
	summary: 'Deletes scolarship by Id',
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'Scolarship Id',
			},
		},
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				_id: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
                eligiblity: { type: 'string' },
                status: { type: 'boolean' }
			},
		},
	},
};