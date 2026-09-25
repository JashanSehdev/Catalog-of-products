// app/providers.tsx
"use client";
import { ThemeProvider } from "@mui/material/styles";
import {theme} from '@/app/theme/theme'
import {SnackbarProvider} from 'notistack'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}><SnackbarProvider>{children}</SnackbarProvider></ThemeProvider>;
}   