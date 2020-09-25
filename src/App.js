import React from "react";
import "./App.css";

import TodoList from "./containers/TodoList/TodoList";
import RealDetail from "./containers/TodoList/RealDetail/RealDetail";
import NewTodo from "./containers/TodoList/NewTodo/NewTodo";

<<<<<<< HEAD
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
=======
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
>>>>>>> http-request

function App(props) {
  return (
<<<<<<< HEAD
    <BrowserRouter>
=======
    <ConnectedRouter history={props.history}>
>>>>>>> http-request
      <div className="App">
        <Switch>
          <Route
            path="/todos"
            exact
            render={() => <TodoList title="My TODOs!" />}
          />
          <Route path="/todos/:id" exact component={RealDetail} />
          <Route path="/new-todo" exact component={NewTodo} />
          <Redirect exact from="/" to="todos" />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
<<<<<<< HEAD
    </BrowserRouter>
=======
    </ConnectedRouter>
>>>>>>> http-request
  );
}

export default App;
