import React from 'react'
import Button from './Button'

export function Search({searchTerm, className, onSeachChange, onSubmit, children}) {
    return (
        <form onSubmit={onSubmit}>
            <div className='row'>
                <div className='col-md-7 offset-md-2 '>
                    <input  type="search" 
                        className={className}
                        value={searchTerm}
                        onChange={onSeachChange}
                        placeholder={children.text}
                    />
                </div>
                <div className='col-md-1'>
                    <Button type='submit' className='btn btn-success'>Search</Button>
                </div>
            </div>  
      </form>
    )
}

export default Search
