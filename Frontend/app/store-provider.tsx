'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../features/store'; // Adjust this path if your store file is named differently
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // Use a lazy initializer function. React runs this only ONCE on creation.
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}> <PersistGate loading={null} persistor={store.__persistor}>{children}</PersistGate></Provider>;
}