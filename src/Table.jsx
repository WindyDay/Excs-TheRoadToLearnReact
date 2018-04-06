import React, { Component } from 'react'
import Button from './Button'
import 'bootstrap/dist/css/bootstrap.min.css';

export class Table extends Component {
  render() {
      const {list, searchTerm, isSearched, onDismiss} = this.props;
    return (
        <div>
            <table className='table'>
                <thead className='thead-dark'>
                    <th scope='col'>#</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Author</th>
                    <th scope='col'>Comment</th>
                    <th scope='col'>Point</th>
                    <th scope='col'>Dismiss</th>
                </thead>
                
                {list.filter(isSearched(searchTerm)).map(item=>
                <tr key={item.objectID}>
                    <td>{item.objectID}</td>
                    <td><a href={item.url}>{item.title}</a></td>
                    <td>{item.author}</td>
                    <td>{item.num_comments}</td>
                    <td>{item.points}</td>
                    <td>
                        <Button onClick={()=>onDismiss(item.objectID)}>
                            Dismiss
                        </Button>
                    </td>
                </tr>
            )}
            </table>
            
        </div>
    )
  }
}

export default Table
