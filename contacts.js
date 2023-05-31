const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
	const contacts = await fs.readFile(contactsPath, "utf-8");
	// console.log(contacts);
	return JSON.parse(contacts);;
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const findContact = contacts.find(contact => contact.id === contactId);
	console.log(findContact);
	return findContact || null;
}

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const removedIndex = contacts.findIndex(contact => contact.id === contactId);
	if (removedIndex === -1) throw new Error("Contact not found");
	const removedContacts = contacts.splice(removedIndex, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return removedContacts[0];
}

const addContact = async (name, email, phone) => {
	const contacts = await listContacts();
	const repeatName = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
	if (repeatName) throw new Error(`${name} is in contacts`);

	const newContact = {
		id: uuidv4(),
		name,
		email,
		phone
	}

	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
}
