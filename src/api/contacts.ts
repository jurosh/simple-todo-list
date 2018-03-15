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

const PAGE_SIZE = 10;

const getContactsPart = pageOffset => {
  return Expo.Contacts.getContactsAsync({
    fields: [], // Expo.Contacts.EMAILS], // Expo.Contacts.PHONE_NUMBERS, Expo.Contacts.THUMBNAIL],
    pageSize: PAGE_SIZE,
    pageOffset
  });
};

export const getAllContacts = async (processBatch: (data, hasNext, total) => void) => {
  const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
  if (permission.status !== 'granted') {
    return;
  }
  let hasNext = true;
  let offset = 0;
  while (hasNext) {
    const { data, hasNextPage, hasPreviousPage, total } = await getContactsPart(offset);
    hasNext = hasNextPage;
    // TODO: required scope ?
    ((data, hasNext, total) =>
      requestAnimationFrame(() => {
        processBatch(data, hasNext, total);
      }))(data, hasNext, total);
    console.log('OFFSET', offset);
    offset += PAGE_SIZE;
  }
  return [];
};
