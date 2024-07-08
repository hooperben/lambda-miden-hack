import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <>
          <Toaster />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
