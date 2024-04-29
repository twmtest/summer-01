import { Inter } from "next/font/google";
import "@/app/ui/global.css";
import TopBar from "@/app/ui/TopBar";
import { getCurrentUser } from "./lib/session";
import Provider from "@/app/context/client-provider"

const inter = Inter({ subsets: ["latin"] });



export default  async function RootLayout({
  children
  
}: Readonly<{
  children: React.ReactNode
  
}>) {
  
  const session = await getCurrentUser()
  return (
    
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
      <Provider session={session}>
        <header>
          <TopBar /> 
        </header>
        {children}
      </Provider>
        
      </body>
    </html>
    
  );
}
