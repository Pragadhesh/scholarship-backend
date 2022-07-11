import mongoose from 'mongoose';
import * as validator from 'validator'

const UsersSchema = new mongoose.Schema({
	firstname: 
	{
		type: String,
		required: true,
		validate:
		{
			validator(firstname: string)
			{
				return validator.default.isAlphanumeric(firstname)
			}
		}
	},
	lastname: 
	{
		type: String,
		required: true,
		validate:
		{
			validator(lastname: string)
			{
				return validator.default.isAlphanumeric(lastname)
			}
		}
	},
	email: 
	{
		type: String,
		required: true,
		validate:
		{
			validator(email: string)
			{
				return validator.default.isEmail(email)
			}
		}
	},	
},
{
	collection: 'Users',
	timestamps: true
});

export default mongoose.model('Users', UsersSchema);
