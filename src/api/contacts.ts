import Expo from 'expo';

export const getContact = async id => {
  const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
  if (permission.status !== 'granted') {
    return;
  }
  return await Expo.Contacts.getContactByIdAsync({
    fields: [Expo.Contacts.PHONE_NUMBERS, Expo.Contacts.EMAILS, Expo.Contacts.THUMBNAIL],
    id
  });
};

const PAGE_SIZE = 15;

const getContactsPart = pageOffset => {
  return Expo.Contacts.getContactsAsync({
    fields: [Expo.Contacts.PHONE_NUMBERS, Expo.Contacts.EMAILS, Expo.Contacts.THUMBNAIL],
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
    const { data, hasNextPage, total } = await getContactsPart(offset);
    hasNext = hasNextPage;
    ((data, hasNext, total) =>
      requestAnimationFrame(() => processBatch(data, hasNext, total)))(
      data,
      hasNext,
      total
    );
    offset += PAGE_SIZE;
  }
  return [];
};
