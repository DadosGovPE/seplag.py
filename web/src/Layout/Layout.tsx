import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { signed, signOut } = useAuth();

  const links = [
    { name: 'Home', link: '/' },
    ...(signed
      ? [
          { name: 'Agendamento', link: '/admin-agendamento', admin: true },
          { name: 'Cadastro de Aulas', link: '/admin-aulas', admin: true },
          { name: 'Gerencia', link: '/admin-gerencia', admin: true },
        ]
      : [{ name: 'Admin', link: '/admin' }]),
  ];

  const isAdminPath = location.pathname !== '/';

  const headerClass = isAdminPath ? 'bg-[#4e76aa] text-white' : 'bg-transparent text-white';
  const linkClass = isAdminPath ? 'text-white rounded hover:pointer' : '';
  const mainClass = isAdminPath ? 'py-20' : '';

  return (
    <div className="relative h-screen">
      <header className={`w-full absolute px-5 ${headerClass}`}>
        <div className="flex items-center justify-between p-4">
          <img src="logo.png" className="h-8" alt="Logo" />
          <nav className="hidden lg:flex space-x-4">
            {links.map(({ name, link, admin }) => (
              <Link
                key={link}
                to={link}
                className={`${
                  location.pathname === link
                    ? ' rounded py-2 px-4 border'
                    : `${linkClass} hover:rounded p-2`
                } ${admin ? 'text-white' : ''}`}
              >
                {name}
              </Link>
            ))}
            {signed && (
              <button
                onClick={signOut}
                className={`${linkClass} p-2 hover:bg-red-500`}
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className={`${mainClass} flex-grow`}>{children}</main>
      
      <footer className="bg-gray-800 text-white p-6 text-center bottom-auto w-full">      
              <p>Direitos Reservados 2024 - Instituto de Gestão de Pernambuco</p>
      </footer>
    </div>
  );
};

export default Layout;
