import Expo from 'expo';

const getContacts = () => {
  Expo.Permissions.askAsync(Expo.Permissions.CONTACTS).then(permission => {
    if (permission.status !== 'granted') {
      return;
    }
    Expo.Contacts.getContactsAsync({
      fields: [Expo.Contacts.PHONE_NUMBERS, Expo.Contacts.EMAILS],
      pageSize: 20,
      pageOffset: 0
    }).then(({ data, hasNextPage, hasPreviousPage, total }) => {
      console.log('CONTACTS', total);
    });
  });
};
