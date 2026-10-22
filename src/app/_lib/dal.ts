// // @ts-expect-error -- `server-only` is a runtime marker with no type declarations.

// import 'server-only';
// import { cookies } from 'next/headers';

// export async function verifySession() {
//   const cookieStore = await cookies();
//   const sessionToken = cookieStore.get('session')?.value;

//   if (!sessionToken) {
//     return null;
//   }

//   // Verify the token or look up the session
//   // using your authentication system.
//   // Return the verified session, or null.

//   return validateSession(sessionToken);
// }
