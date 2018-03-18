import { getDb } from './index';

export const queryOtherUser = () => {
  getDb()
    .collection('users')
    .doc('iiSkUbL07pxK29mSn41k')
    .get()
    .then(data => console.log('YSER ?', data.data()))
    .catch(error => console.log('111 Chyba no permission', error));

  getDb()
    .collection('users')
    .doc('iiSkUbL07pxK29mSn41k')
    .collection('lists')
    .doc('e383t9jd2W0wloLxd2kX')
    .get()
    .then(data => console.log(data))
    .catch(error => console.log('Chyba no permission', error));
};
