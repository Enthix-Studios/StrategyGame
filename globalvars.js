// Todo: Make game values not global 
module.exports = {
	state: 0,
	room: 0,
	interaction: 0,
	username: null,
	message: null // Known bug: if the bot crashes or user create a new game session, the bot may crash again.
}
