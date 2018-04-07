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
      results: null,
      searchKey: DEFAULT_QUERY,
      searchTerm: DEFAULT_QUERY,
    }

    // this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  onDismiss = (id) =>{
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const updatedList = hits.filter(item => item.objectID !== id);

    // const result = Object.assign({}, this.state.result, {hits: updatedList})
    this.setState({results: {
      ...results,
      [searchKey]:{hits:updatedList, page}
    }});
  }
  
  onSeachChange = (event)=>{
    this.setState({
      searchTerm: event.target.value,
    })
  }

  onSearchSubmit = (event) =>{
    const {results, searchTerm}= this.state;
    
    this.setState({searchKey: searchTerm});

    if(results && !results[searchTerm]){
      console.log(searchTerm);
      this.fetchTopStories(searchTerm);
    }
    event.preventDefault();
    
  }

  setSearchTopStories = (result) => {
    
    const { hits, page } = result;
    const { searchKey, results } = this.state;


    const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];
    
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    
    console.log('updatedHits: ');
    console.log(updatedHits);
    this.setState({ results : {
      ...results,
      [searchKey]:{hits: updatedHits, page}
    }});

    
  }

  fetchTopStories = (searchTerm, page='0')=>{
    console.log('Fetching');
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
    const {results, searchKey, searchTerm} = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    //if(!result) return 'Waiting for API response';
    return (
      <div className="App container">
        <h1>{helloWord}</h1>
        <br/>
        <Search className={'form-control'} searchTerm={searchTerm} onSeachChange={this.onSeachChange} onSubmit={this.onSearchSubmit}>
          Enter something here to start searching 
        </Search>
        <hr/>
        {results && results[searchKey] && results[searchKey].hits &&
        <Table  list={results[searchKey].hits} 
                onDismiss={this.onDismiss}
        />
        }
        <div className='center-block'>
          <Button className='btn btn-success' onClick={()=>this.fetchTopStories(searchTerm, page+1)}>Read more</Button>
        </div>
        <hr/>
      </div>
        
    );
  }
}

export default App;