function Model(storageKey) {
  var this_ = this;

  this.todos = JSON.parse(localStorage.getItem(storageKey)) || [];

  this.commit = function(todos) {
    this_.onTodoListChanged(todos);
    localStorage.setItem(storageKey, JSON.stringify(todos));
    sessionStorage.setItem(storageKey, JSON.stringify(todos));
  };

  this.addTodo = function(todoText) {
    var todo = {
      id:
        this_.todos.length > 0 ? this_.todos[this_.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false
    };
    this_.todos.push(todo);
    this.commit(this.todos);
  };

  this.deleteTodo = function(id) {
    this_.todos = this_.todos.filter(function(todo) {
      return todo.id !== id;
    });
    this.commit(this.todos);
  };

  this.toggleTodo = function(id) {
    this_.todos = this_.todos.map(function(todo) {
      return todo.id === id
        ? { id: todo.id, text: todo.text, complete: !todo.complete }
        : todo;
    });
    this.commit(this.todos);
  };

  this.bindTodoListChanged = function(callback) {
    this_.onTodoListChanged = callback;
  };
}
