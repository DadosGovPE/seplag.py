import { Link, useLocation } from 'react-router-dom';
import '../styles.css';
import { useAuth } from '../hooks/AuthContext'; // Importando o hook do contexto de autenticação

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { signed, signOut } = useAuth();

  const links = [
    { name: 'Home', link: '/' },
    { name: 'Aulas Anteriores', link: '/aulas-anteriores' },
    { name: 'NewsLetter', link: '/newsletter' },
    ...(signed
      ? [{ name: 'Agendamento', link: '/admin-agendamento', admin: true }]
      : [{ name: 'Admin', link: '/admin' }]),
  ];

  return (
    <div className="relative flex h-screen bg-gray-100 overflow-hidden">
      <aside className="w-64 bg-white shadow-md relative z-10 flex flex-col justify-between">
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
                    } ${admin ? 'bg-yellow-200' : ''}`} // Adiciona classe de fundo diferente para o link de admin
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

      <main className="flex-1 p-6 relative z-10">{children}</main>
    </div>
  );
};

export default Layout;
