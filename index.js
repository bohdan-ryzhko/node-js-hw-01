const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case "list":
			const contacts = await listContacts();
			return console.log(contacts);
		case "get":
			const findedContact = await getContactById(id);
			return console.log(findedContact);
		case "add":
			const addedContact = await addContact(name, email, phone);
			return console.log(addedContact);
		case "remove":
			const removedContact = await removeContact(id);
			return console.log(removedContact);
		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction({ action: "remove", id: "f92d2351-463f-4c1d-bf44-8c9f7a7e9b8f" });
