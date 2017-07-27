import $ from 'jquery';
import cn from 'classnames';

$(function() {
  var initialTodos = [
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

  render(initialTodos);
});

function render(todos) {
  const $list = $('#item-list');
  const listHtml = todos.map(function(todo) {
    const className = cn({
      checked: todo.done,
    });
    return `<li class="${className}">
      <input type="checkbox" />
      <span>${todo.title}</span>
      <a href="#" class="delete">削除</a>
    </li>`;
  });

  $list.html(listHtml);
}


