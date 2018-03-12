import { share } from '../../api/share';
import { ITodo } from './types';

export const shareTodosList = (name: string, list: ITodo[]) => {
  const content = `Todos "${name}"

${list.map(todo => `* todo.text ${todo.image ? `(${todo.image})` : ''}`).join('\n')}
`;
  share(name, content);
};
