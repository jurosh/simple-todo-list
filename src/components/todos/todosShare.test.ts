import { renderTodoList } from './todosShare';

it('todosShare:renderTodoList', () => {
  expect(
    renderTodoList('LIST_NAME', [
      {
        text: 'TODO_TEXT'
      },
      {
        text: 'IMAGE_NAME',
        image: 'IMAGE_LINK'
      },
      {
        text: 'CONTACT',
        contactName: 'CONTACT_NAME'
      }
    ])
  ).toEqual(`Todos "LIST_NAME"

* TODO_TEXT
* IMAGE_NAME (IMAGE_LINK)
* CONTACT (@CONTACT_NAME)
`);
});

// it('todosShare:renderTodoList empty list', () => {
//   expect(renderTodoList('NAME', [])).toBeTruthy();
// });
