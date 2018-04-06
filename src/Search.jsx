import React from 'react'

export function Search({searchTerm, onSeachChange, children}) {
    return (
        <form>
            {children}<input  type="search" 
                value={searchTerm}
                onChange={onSeachChange}
            />
      </form>
    )
}

export default Search
