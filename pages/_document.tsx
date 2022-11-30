import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html className="h-full bg-gray-50">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
