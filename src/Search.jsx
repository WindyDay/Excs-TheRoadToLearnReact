import React from 'react'

export function Search({searchTerm, className, onSeachChange, children}) {
    return (
        <form>
            <input  type="search" 
                className={className}
                value={searchTerm}
                onChange={onSeachChange}
                placeHolder={children}
            />
      </form>
    )
}

export default Search
