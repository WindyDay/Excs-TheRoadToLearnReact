import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Search'
import Table from './Table'
import Button from './Button'


const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '60';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const queryURL = `${PATH_BASE}${PATH_SEARCH}`;
  
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
  }

  onSearchSubmit = (event) =>{
    this.fetchTopStories(this.state.searchTerm);
    event.preventDefault();
    
  }

  setSearchTopStories = (result) => {
    
    const {hits, page} = result;

    const oldHits = page === 0 ? [] : this.state.result.hits;
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    
    this.setState({ result : {hits: updatedHits, page}});

  }

  fetchTopStories = (searchTerm, page='0')=>{
    fetch(`${queryURL}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
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
    const page = (result && result.page) || 0;
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
        <div className='center-block'>
          <Button className='btn btn-success' onClick={()=>this.fetchTopStories(searchTerm, page+1)}>Read more</Button>
        </div>
      </div>
        
    );
  }
}

export default App;