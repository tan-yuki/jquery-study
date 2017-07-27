import $ from 'jquery';
import cn from 'classnames';
import _ from 'lodash';

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

function updateTodo(id, attrs) {

  const index = _.findIndex(todos, (todo) => {
    return id === todo.id;
  });

  if (index < 0) {
    return;
  }

  for (let key in attrs) {
    todos[index][key] = attrs[key];
  }
  render();
}

function render() {
  const $list = $('#item-list');
  const listHtml = todos.map(function(todo) {
    const className = cn({
      checked: todo.done,
    });
    const checked = todo.done ? ' checked' : '';
    return `<li class="${className}" id="todo-item-${todo.id}" data-id="${todo.id}">
      <input type="checkbox" ${checked} />
      <span>${todo.title}</span>
      <a href="#" class="delete">削除</a>
    </li>`;
  });

  $list.html(listHtml);

  $('.delete').click(function(e) {
    e.preventDefault();

    deleteTodo($(this).parents('li').attr('data-id'));
  });

  $('#item-list').find('li span').dblclick(function(e) {
    const initValue = $(this).text();
    const inputTextHtml = `<input type="text"
      value=${initValue}
    />`;

    $(this).html(inputTextHtml);
    $(this).find('input').keydown(function(e) {
      if (e.keyCode !== 13) {
        return;
      }

      const id = $(this).parents('li').attr('data-id');
      const title = $(this).val();

      updateTodo(parseInt(id, 10), {
        title: title
      });
    });
  });

  $('#item-list').find('li input[type="checkbox"]').change(function(e) {
    const id = $(this).parents('li').attr('data-id');
    const checked = $(this).is(':checked');

    updateTodo(parseInt(id, 10), {
      done: checked
    });
  });
}
