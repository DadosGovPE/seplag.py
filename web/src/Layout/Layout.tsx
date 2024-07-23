import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const links = [
    { name: 'Home', link: '/' },
    { name: 'Aulas Anteriores', link: '/aulas-anteriores' },
    { name: 'NewsLetter', link: '/newsletter' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <ul className="space-y-4">
            {links.map(({ name, link }) => (
              <li key={link}>
                <Link
                  className={`block text-blue-500 px-3 py-2 rounded transition-colors duration-300 ${
                    location.pathname === link
                      ? 'bg-blue-700 text-white'
                      : 'hover:bg-blue-700 hover:text-white'
                  }`}
                  to={link}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;