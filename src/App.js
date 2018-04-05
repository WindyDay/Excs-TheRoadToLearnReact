import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {
  render() {
    let helloWord = "Welcome to the Road to learn react";

    return (
      <div className="App">
        <h1>{helloWord}</h1>
        {list.map(item=>
            <div key={item.objectID}>
              <a href={item.url}>{item.title} - {item.author} - {item.points} point - {item.num_comments} cmt</a>
            </div>
        )}
      </div>
    );
  }
}

export default App;
