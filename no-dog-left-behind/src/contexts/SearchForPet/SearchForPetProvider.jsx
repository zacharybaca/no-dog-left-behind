import { SearchForPetContext } from './SearchForPetContext'


export const SearchForPetProvider = ({ children }) => {
  
    
    return (
        <SearchForPetContext.Provider>
            {children}
        </SearchForPetContext.Provider>
    )
}
