import React from 'react';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="p-4 bg-black/30 backdrop-blur-md shadow-lg flex justify-between items-center">
        <h1 className="text-xl font-bold">💰 Project Estimator</h1>
        <nav className="flex gap-4">
          <Link href="/" className="hover:underline">Projects</Link>
          <Link href="/add-project" className="hover:underline">Add Project</Link>
        </nav>
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default Layout;
