import mongoose from 'mongoose';

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
    },
	templateid:
	{
		type: String,
		required: true
	}
},
{
	collection: 'Scolarship',
	timestamps: true
});

export default mongoose.model('Scolarship', ScolarshipSchema);
