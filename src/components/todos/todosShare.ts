import { share } from '../../api/share';
import { ITodo } from '../../api/lists';

const renderImage = image => (image ? `(${image})` : '');

const renderContact = contactName => (contactName ? `(@${contactName})` : '');

const renderAttachments = (todo: ITodo) => {
  const attachments = [renderContact(todo.contactName), renderImage(todo.image)].filter(
    text => !!text
  );
  return attachments.length > 0 ? ' ' + attachments.join(' ') : '';
};

export const renderTodoList = (name: string, list: ITodo[]) =>
  `Todos "${name}"

${list.map(todo => `* ${todo.text}${renderAttachments(todo)}`).join('\n')}
`;

export const shareTodosList = (name: string, list: ITodo[]) =>
  share(name, renderTodoList(name, list));
