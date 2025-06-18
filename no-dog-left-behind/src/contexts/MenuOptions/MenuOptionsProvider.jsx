import { MenuOptionsContext } from './MenuOptionsContext.jsx';

export const MenuOptionsProvider = ({ children }) => {

    return (
        <MenuOptionsContext.Provider>
            { children }
        </MenuOptionsContext.Provider>
    )
}
