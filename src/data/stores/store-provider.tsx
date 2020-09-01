import React, { ReactElement } from 'react'

import { AppStoreProvider } from './app-store'

interface StoreProviderProps {
    children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps): ReactElement => (
    <AppStoreProvider>
        {children}
    </AppStoreProvider>
)

export default StoreProvider
