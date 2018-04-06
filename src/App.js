import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Search'
import Table from './Table'

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const queryURL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;
  
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    }

    // this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  onDismiss = (id) =>{
    const updatedList = this.state.result.hits.filter(item => item.objectID !== id);

    // const result = Object.assign({}, this.state.result, {hits: updatedList});
    const result = {...this.state.result, hits:updatedList}
    this.setState({result: result});
  }
  
  onSeachChange = (event)=>{
    this.setState({
      searchTerm: event.target.value,
    })
    console.log('searchTerm: ' + this.state.searchTerm);
  }

  onSearchSubmit = (event) =>{
    this.fetchTopStories(this.state.searchTerm);
    event.preventDefault();
    
  }

  setSearchTopStories = (result) => {
    this.setState({ result });
  }

  fetchTopStories = (searchTerm)=>{
    fetch(queryURL+searchTerm)
    .then(res=>res.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }

  componentDidMount(){
    const {searchTerm} = this.state;
    this.fetchTopStories(searchTerm);   
  }

  render() {
    let helloWord = 'Welcome to "The road to learn React"';
    const {result, searchTerm} = this.state;
    //if(!result) return 'Waiting for API response';
    return (
      <div className="App container">
        <h1>{helloWord}</h1>
        <br/>
        <Search className={'form-control'} searchTerm={searchTerm} onSeachChange={this.onSeachChange} onSubmit={this.onSearchSubmit}>
          Enter something here to start searching 
        </Search>
        <hr/>
        {result && 
        <Table  list={result.hits} 
                onDismiss={this.onDismiss}
        />
      }
      </div>
        
    );
  }
}

export default App;