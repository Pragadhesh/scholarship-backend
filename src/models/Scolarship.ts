import mongoose from 'mongoose';
import * as validator from 'validator'

const ScolarshipSchema = new mongoose.Schema({
	name: 
	{
		type: String,
		required: true
	},
	description: 
	{
		type: String,
		required: true
	},
	eligiblity: 
	{
		type: String,
		required: true
	},
    status:
    {
        type: Boolean,
        required: true
    }
},
{
	collection: 'Scolarship',
	timestamps: true
});

export default mongoose.model('Scolarship', ScolarshipSchema);
