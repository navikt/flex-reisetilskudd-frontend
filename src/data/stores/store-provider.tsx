import React from 'react'

import { AppStoreProvider } from './app-store'

interface StoreProviderProps {
    children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => (
    <AppStoreProvider>
        {children}
    </AppStoreProvider>
)

export default StoreProvider
