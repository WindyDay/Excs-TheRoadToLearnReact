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

// // ES5
// function isSearched(searchTerm) {
//   return function(item) {
//     return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
//   }
// }

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
  
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:list,
      searchTerm: '',
    }

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(id){
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list: updatedList});
  }
  
  onSeachChange = (event)=>{
    this.setState({
      searchTerm: event.target.value,
    })
  }

  render() {
    let helloWord = "Welcome to the Road to learn react";

    return (
      <div className="App">
        <h1>{helloWord}</h1>
        <form>
          <input type="search" onChange={this.onSeachChange}/>
        </form>
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item=>
            <div key={item.objectID}>
              <a href={item.url}>{item.title} - {item.author} - {item.points} point - {item.num_comments} cmt</a>
              <button
                onClick={()=>this.onDismiss(item.objectID)}
              >
                Dismiss
              </button>
            </div>
        )}
      </div>
    );
  }
}

export default App;
