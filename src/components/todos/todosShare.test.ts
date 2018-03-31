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
        contact: {
          id: 'ID',
          email: 'EMAIL',
          name: 'NAME',
          phone: 'PHONE',
          image: 'IMAGE'
        }
      }
    ])
  ).toEqual(`Todos "LIST_NAME"

* TODO_TEXT
* IMAGE_NAME (IMAGE_LINK)
* CONTACT (@NAME, PHONE, EMAIL)
`);
});

// it('todosShare:renderTodoList empty list', () => {
//   expect(renderTodoList('NAME', [])).toBeTruthy();
// });
