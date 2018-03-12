import Expo from 'expo';

const getContact = async id => {
  const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
  if (permission.status !== 'granted') {
    return;
  }
  const contact = await Expo.Contacts.getContactByIdAsync({
    fields: [Expo.Contacts.PHONE_NUMBERS, Expo.Contacts.EMAILS],
    id
  });
  console.log(contact);
};

export const getContacts = async () => {
  const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
  if (permission.status !== 'granted') {
    return;
  }
  const {
    data,
    hasNextPage,
    hasPreviousPage,
    total
  } = await Expo.Contacts.getContactsAsync({
    fields: [Expo.Contacts.PHONE_NUMBERS, Expo.Contacts.EMAILS, Expo.Contacts.THUMBNAIL],
    pageSize: 20,
    pageOffset: 0
  });

  console.log('CONTACTS', total, data);
};
