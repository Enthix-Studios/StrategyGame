import { User } from "discord.js";

export class Player {
	user: User;

	constructor(user: User) {
		this.user = user;
	}
}
