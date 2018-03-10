import { getDb } from './index';

export const getLists = () =>
  //: Promise<{ name: string }[]> =>
  getDb()
    .collection('lists')
    .get() as any;
