// Define the Header component
const Header: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <header className='bg-white rounded-l-sm rounded-r-sm  px-6 py-4 shadow-md'>
      <div className="flex items-center max-w-7xl mx-auto">
      {children}
      </div>
    </header>
  )
}

export { Header }
