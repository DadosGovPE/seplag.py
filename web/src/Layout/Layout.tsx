import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { signed, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: 'Home', link: '/' },
    { name: 'Aulas Anteriores', link: '/aulas-anteriores' },
    { name: 'NewsLetter', link: '/newsletter' },
    ...(signed
      ? [
        { name: 'Agendamento', link: '/admin-agendamento', admin: true },
        { name: 'Cadastro de Aulas', link: '/admin-aulas', admin: true}
        ]
      : [{ name: 'Admin', link: '/admin' }]),
  ];

  return (
    <div className="relative flex h-screen bg-gray-100">
      <header className="w-full bg-white shadow-md fixed top-0 left-0 lg:hidden">
        <div className="flex items-center justify-between p-4">
          <img src="logo.png" className="h-8" alt="Logo" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-500 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full bg-white shadow-md h-full overflow-y-auto "
          >
            <div className="p-4">
              <ul className="space-y-4">
                {links.map(({ name, link, admin }) => (
                  <li key={link}>
                    <Link
                      className={`block text-blue-500 px-3 py-2 rounded transition-colors duration-300 border border-gray-300 ${
                        location.pathname === link
                          ? 'bg-blue-700 text-white border-blue-500'
                          : 'hover:bg-blue-700 hover:text-white'
                      } ${admin ? 'bg-yellow-400' : ''}`}
                      to={link}
                      onClick={() => setMenuOpen(false)}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
                {signed && (
                  <li>
                    <button
                      onClick={signOut}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </motion.nav>
        )}
      </header>

      <aside className="w-64 bg-white shadow-md relative hidden lg:flex lg:flex-col lg:justify-between h-full">
        <div>
          <img src="logo.png" className="p-4" alt="Logo" />
          <div className="p-4">
            <ul className="space-y-4">
              {links.map(({ name, link, admin }) => (
                <li key={link}>
                  <Link
                    className={`block text-blue-500 px-3 py-2 rounded transition-colors duration-300 border border-gray-300 ${
                      location.pathname === link
                        ? 'bg-blue-700 text-white border-blue-500'
                        : 'hover:bg-blue-700 hover:text-white'
                    } 
                    
                    ${admin ? ` rounded transition-colors duration-300 ${ location.pathname === link
                        ? 'bg-yellow-400 text-blue-600'
                        : 'bg-white text-blue-600  hover:text-blue-600 hover:bg-yellow-400  '} ` : ''} `} 
                    to={link}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {signed && (
          <div className="p-4">
            <button
              onClick={signOut}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </aside>

      <main className="flex-1 p-6 overflow-y-auto ">{children}</main>
    </div>
  );
};

export default Layout;
