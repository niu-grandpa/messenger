import ActiveStatus from './components/ActiveStatus';
import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';
import './globals.css';

export const metadata = {
  title: '在线聊天',
  description: 'Messenger Clone,在线聊天,实时聊天,web聊天,聊天网站',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          href='/images/favicon.ico'
          sizes='48x48'
          type='image/x-icon'
        />
      </head>
      <body>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
