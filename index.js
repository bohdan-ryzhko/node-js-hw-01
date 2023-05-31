const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
	.option("-a, --action, <type>")
	.option("-i, --id, <type>")
	.option("-n, --name, <type>")
	.option("-e, --email, <type>")
	.option("-p, --phone, <type>")

program.parse();

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case "list":
			const contacts = await listContacts();
			return console.table(contacts);
		case "get":
			const findedContact = await getContactById(id);
			return console.table(findedContact);
		case "add":
			const addedContact = await addContact(name, email, phone);
			return console.table(addedContact);
		case "remove":
			const removedContact = await removeContact(id);
			return console.table(removedContact);
		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);