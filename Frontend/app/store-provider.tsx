'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../features/store';
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}> <PersistGate loading={null} persistor={store.__persistor}>{children}</PersistGate></Provider>;
}