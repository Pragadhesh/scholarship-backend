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
				templateid: { type: 'string'},
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
                status: { type: 'boolean' },
				templateid: {type: 'string'}
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
                    status: { type: 'boolean' },
					templateid: {type: 'string'}
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

export const ApplyScolarshipSchema = {
	description: 'Embedded signing during applying for a scholarship',
	tags: ['scolarship'],
	summary: 'Returns docusign embedded signing feature',
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'Scolarship Id',
			},
			signerEmail: {
				type: 'string',
				description: 'signerEmail'
			},
			signerName: {
				type: 'string',
				description: 'signerName'
			}
		},
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				envelopeId: { type: 'string' },
				redirectUrl: { type: 'string' },
			},
		},
	},
};


export const GetConsentSchema = {
	description: 'Gets consent url',
	tags: ['scolarship'],
	summary: 'Gets consent url',
	params: {
		type: 'object',
		properties: {
			templateid: {
				type: 'string',
				description: 'Template Id',
			},
	}
},
	response: {
		200: {
			description: 'Successful response',
				type: 'object',
				properties: {
					consent_url: { type: 'string' },
				},
		},
	},
};