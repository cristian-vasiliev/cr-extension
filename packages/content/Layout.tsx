import Header from '@content/Header';

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
