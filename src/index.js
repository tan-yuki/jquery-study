import $ from 'jquery';
import cn from 'classnames';

var todos = [
  {
    id: 1,
    title: "牛乳買う",
    done: false
  },
  {
    id: 2,
    title: "醤油買う",
    done: false
  },
  {
    id: 3,
    title: "スプラトゥーン2買う",
    done: false
  },
];

$(function() {
  render();

  $('#add-todo-form').submit(function(e) {
    e.preventDefault();

    const $inputValue = $(this).find('.todo-value');
    const newTitle = $inputValue.val();
    addTodo(newTitle);

    $inputValue.val('');
  });

  $('.delete').click(function(e) {
    e.preventDefault();

    deleteTodo($(this).parents('li').attr('data-id'));
  });
});

function addTodo(title) {
  const maxId = todos.reduce((max, v) => Math.max(max, v.id), 0);
  todos.push({
    id: maxId + 1,
    title: title,
    done: false
  });

  render();
}

function deleteTodo(id) {
  $(`#todo-item-${id}`).remove();
}

function render() {
  const $list = $('#item-list');
  const listHtml = todos.map(function(todo) {
    const className = cn({
      checked: todo.done,
    });
    return `<li class="${className}" id="todo-item-${todo.id}" data-id="${todo.id}">
      <input type="checkbox" />
      <span>${todo.title}</span>
      <a href="#" class="delete">削除</a>
    </li>`;
  });

  $list.html(listHtml);
}
