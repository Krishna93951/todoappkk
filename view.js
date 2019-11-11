function View(rootElement) {
  var self = this;
  this.rootEle = rootElement;

  this.createElement = function(tag, attribute) {
    var element = document.createElement(tag, attribute);
    for (var i in attribute) {
      element.setAttribute(i, attribute[i]);
    }
    return element;
  };

  this.createListElements = function(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  };

  this.app = this.rootEle;

  this.title = this.createElement("h1", { id: "title" });
  this.title.textContent = "Todos";

  this.form = this.createElement("form");

  this.input = this.createElement("input");
  this.input.type = "text";
  this.input.placeholder = "Add todo";
  this.input.name = "todo";
  this.input.id = "inputField";

  this.submitButton = this.createElement("button");
  this.submitButton.textContent = "Submit";

  this.todoList = this.createElement("ul", { class: "todo-list" });

  this.container = this.createElement("div", { class: "storageType" });

  this.createDropdown = function() {
    var dropdown = this.createElement("select", { class: "storage" });
    var option = {
      option1: this.createElement("option", { value: "SessionStorage" }),
      option2: this.createElement("option", { value: "LocalStorage" }),
      option1TextContent: this.customCreateTextNode("SessionStorage"),
      option2TextContent: this.customCreateTextNode("LocalStorage")
    };
    this.appendToDropdown(dropdown, option);
    return dropdown;
  };

  this.appendToDropdown = function(dropdown, option) {
    option.option1.append(option.option1TextContent);
    option.option2.append(option.option2TextContent);
    dropdown.appendChild(option.option1);
    dropdown.appendChild(option.option2);
  };

  this.customCreateTextNode = function(ele) {
    return document.createTextNode(ele);
  };

  this.createParagraphElement = function() {
    var taskCount = this.createElement("p", { class: "allTasks" });
    // this.appendTaskCount(taskCount);
    return taskCount;
  };

  this.container.appendChild(this.createDropdown());

  this.form.append(this.input, this.submitButton);

  this.app.append(this.title, this.form, this.container, this.todoList);

  this.app.appendChild(this.createParagraphElement());

  this.resetAndFocusInput = function() {
    self.input.value = "";
    self.input.focus();
  };

  this.displayTodos = function(todos) {
    var list = self.rootEle.querySelector(".todo-list");
    list.innerText = "";
    if (todos.length === 0) {
      var p = this.createElement("p");
      p.textContent = "Nothing to do! Add a task?";
      this.todoList.append(p);
      self.emptyListMessage();
    } else {
      todos.forEach(function(todo) {
        var li = self.createListElements("li", "listItem");
        li.id = todo.id;

        var checkbox = self.createListElements("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;

        var span = self.createListElements("span");

        if (todo.complete) {
          var strike = self.createListElements("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          span.textContent = todo.text;
        }

        var deleteButton = self.createListElements("button", "delete");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
          var event = new Event("deleteItem", { bubbles: true });
          deleteButton.dispatchEvent(event);
        });
        li.append(checkbox, span, deleteButton);
        self.todoList.append(li);
      });
    }
  };

  this.emptyListMessage = function() {
    var totalTodos = self.rootEle.querySelector(".allTasks");
    var countMessage = {
      all: "All Tasks: ",
      completed: " / Number of Completed Tasks: ",
      pending: " / Number of Pending Tasks: "
    };
    return (totalTodos.innerText =
      countMessage.all +
      "0" +
      " " +
      countMessage.completed +
      "0" +
      " " +
      countMessage.pending +
      "0");
  };

  this.totalMsg = function(checkedCount, pending, taskData) {
    var totalTodos = self.rootEle.querySelector(".allTasks");
    var countMessage = {
      all: "All Tasks: ",
      completed: " / Number of Completed Tasks: ",
      pending: " / Number of Pending Tasks: "
    };
    return (totalTodos.innerHTML =
      countMessage.all +
      taskData.length +
      " " +
      countMessage.completed +
      checkedCount +
      " " +
      countMessage.pending +
      pending);
  };

  this.bindAddTodo = function(handler) {
    this.form.addEventListener("submit", function(event) {
      if (self.input.value) {
        handler(self.input.value);
        self.resetAndFocusInput();
      }
    });
  };

  this.bindAddTodoOnEnter = function(handler) {
    self.input.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (self.input.value) {
        if (event.keyCode === 13) {
          handler(self.input.value);
          self.resetAndFocusInput();
        }
      }
    });
  };

  // this.bindSelectStorageType = function (handler) {
  //   this.rootEle.querySelector('.storagetype').addEventListener('change', function () {
  //     handler();
  //   })
  // }

  this.bindTaskCount = function(callback) {
    self.taskCount = callback;
  };
}

View.prototype.bindDeleteTodo = function(handler) {
  this.todoList.addEventListener("deleteItem", function(event) {
    if (event.target.className === "delete") {
      var id = parseInt(event.target.parentElement.id);
      handler(id);
      this.totalMsg;
    }
  });
};

View.prototype.bindToggleTodo = function(handler) {
  this.todoList.addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {
      var id = parseInt(event.target.parentElement.id);
      handler(id);
    }
  });
};
