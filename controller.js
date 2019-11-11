function Controller(model, view) {
  var this_ = this;

  this.model = model;
  this.view = view;

  this.onTodoListChanged = function(todos) {
    this_.view.displayTodos(todos);
  };

  this.handleStorageSelection = function handleStorageSelection() {
    var selectedOption = this_.view.rootEle.querySelector(".storage").value;
    var storage = {
      LocalStorage: "LocalStorage",
      SessionStorage: "SessionStorage"
    };
    console.log(storage[selectedOption]);
  };

  this.handleAddTodo = function handleAddTodo(todoText) {
    this_.model.addTodo(todoText);
  };

  this.handleDeleteTodo = function handleDeleteTodo(id) {
    this_.model.deleteTodo(id);
  };

  this.handleToggleTodo = function handleToggleTodo(id) {
    this_.model.toggleTodo(id);
  };

  this.tasksCount = function() {
    var list = this_.view.rootEle.querySelector(".todo-list");
    var taskData = this.model.todos;
    var checkbox = list.querySelectorAll('input[type="checkbox"]:checked');
    var pending;
    var checkedCount = 0;
    for (var i = 0; i < checkbox.length; i++) {
      checkboxCount = checkbox[i].checked ? checkedCount++ : checkedCount--;
    }
    pending = taskData.length - checkedCount;
    this.view.totalMsg(checkedCount, pending, taskData);
  };

  this_.tasksCount(this.view.totalMsg);
  this_.onTodoListChanged(this.model.todos);

  this_.view.bindAddTodo(this.handleAddTodo);
  this_.view.bindAddTodoOnEnter(this.handleAddTodo);
  this_.view.bindDeleteTodo(this.handleDeleteTodo);
  this_.view.bindToggleTodo(this.handleToggleTodo);
  this_.view.bindSelectStorageType(this.handleStorageSelection);
  this_.model.bindTodoListChanged(this_.onTodoListChanged);
}
