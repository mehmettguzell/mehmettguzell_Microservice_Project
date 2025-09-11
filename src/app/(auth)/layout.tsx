export default function authLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        
        <header style={{backgroundColor: 'lightgray', padding: '1rem'}}>
          <p>Auth Header</p>
        </header>
        
        {children}

        <footer style={{backgroundColor: 'ghostwhite', padding: '1rem', marginTop: '1rem'}}>
          <p>Auth Footer</p>
        </footer>        
        
        </body>
    </html>
  )
}
