import './globals.css';

export const metadata = {
  title: 'Intern Portal',
  description: 'Manage intern applications easily.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
