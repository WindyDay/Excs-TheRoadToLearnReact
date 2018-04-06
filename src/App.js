import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Search'
import Table from './Table'
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

const isSearched = searchTerm => item =>{
  return  item.title.toLowerCase().includes(searchTerm.toLowerCase())
        ||item.author.toLowerCase().includes(searchTerm.toLowerCase());
}
  
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
    let helloWord = 'Welcome to "The road to learn React"';
    const {list, searchTerm} = this.state;
    return (
      <div className="App container">
        <h1>{helloWord}</h1>
        <br/>
        <Search className={'form-control'} searchTerm={searchTerm} onSeachChange={this.onSeachChange}>
          Enter something here to start searching 
        </Search>
        <hr/>
        <Table  list={list} 
                onDismiss={this.onDismiss}
                isSearched={isSearched}
                searchTerm={searchTerm}
        />
      </div>
    );
  }
}

export default App;