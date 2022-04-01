import { Schema, model , Types} from "mongoose"

export const UsersBotSchema = new Schema({
	_id: {
		type: Types.ObjectId,
		required: true,
		auto:true,
	},
	chatId: {
		type : String,
		required: true,
	},
	firstName : {
		type : String,
		required: false,
	},
	userName : {
		type : String,
		required: false,
	}
}, { autoCreate : true })

const ChatIds = model("chatIds", UsersBotSchema)
export { ChatIds }