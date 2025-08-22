import { useContext } from 'react'
import { SearchForPetContext } from '../contexts/SearchForPet/SearchForPetContext'

export const useSearchForPet = () => {
    const context = useContext(SearchForPetContext)

    if (!context) {
        throw new Error('useSearchForPet must be used within a SearchForPetContext')
    }
    return context
}
