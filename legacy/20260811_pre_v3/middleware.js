export const config = { matcher: '/(.*)', runtime: 'edge' };

export default function middleware(req) {
  const auth = req.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(':');
      if (user === 'posfin' && pass === 'KPC2026') {
        return new Response(null, { status: 200 });
      }
    }
  }
  return new Response('Restricted — authorised access only.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Kensington Private Credit"',
      'Content-Type': 'text/plain',
    },
  });
}
