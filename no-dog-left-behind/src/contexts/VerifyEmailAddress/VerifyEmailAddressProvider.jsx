// import { VerifyEmailAddressContext } from './VerifyEmailAddressContext'
// import { useFetcher } from '../../hooks/useFetcher'

// export const VerifyEmailProvider = ({ children }) => {
//   const { fetcher } = useFetcher()

//   const verifyEmailAddress = async (email) => {
//     const apiKey = import.meta.env.VITE_EMAIL_VERIFY_API_KEY
//     const apiUrl = import.meta.env.VITE_EMAIL_VERIFY_URL

//     const res = await fetcher(apiUrl, {
//       method: 'POST',
//       headers: {
//         'X-API-KEY': apiKey,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ "email": email, "type": "full" }),
//     })

//     console.log('Data From Verify: ', res)

//     try {
//       if (res.data.action === 'deny') {
//         return {
//           status: 'E-mail Not Approved',
//           reasons: res.data.reasons, // ✅ fixed typo
//         }
//       }

//       if (res.data.action === 'allow') {
//         return {
//           status: 'E-mail Approved',
//         }
//       }

//       return {
//         status: res.status,
//         message: res.message,
//       }
//     } catch (err) {
//       console.error('❌ Verification Error:', err.message)
//       return {
//         status: 'Error',
//         message: err.message,
//       }
//     }
//   }

//   return (
//     <VerifyEmailAddressContext.Provider value={{ verifyEmailAddress }}>
//       {children}
//     </VerifyEmailAddressContext.Provider>
//   )
// }
// import { VerifyEmailAddressContext } from './VerifyEmailAddressContext';
// import { useFetcher } from '../../hooks/useFetcher';

// export const VerifyEmailProvider = ({ children }) => {
//   const { fetcher } = useFetcher();

//   const verifyEmailAddress = async (email) => {
//     const apiUrl = import.meta.env.VITE_EMAIL_VERIFY_URL || "http://localhost:3000/api/verification";
//     const apiKey = import.meta.env.VITE_EMAIL_VERIFY_API_KEY;

//     if (!apiUrl) {
//       console.error('❌ Missing VITE_EMAIL_VERIFY_URL');
//       return { status: 'Error', message: 'API URL not set' };
//     }
//     if (!apiKey) {
//       console.error('❌ Missing VITE_EMAIL_VERIFY_API_KEY');
//       return { status: 'Error', message: 'API key not set' };
//     }

//     if (isDev) {
//       console.info(`ℹ️ Dev Mode: Email verification request → ${apiUrl}`);
//     }

//     try {
//       const res = await fetcher(apiUrl, {
//         method: 'POST',
//         headers: {
//           'X-API-KEY': apiKey,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, type: 'full' }),
//       });

//       if (isDev) {
//         console.log('📬 API Response:', res);
//       }

//       const action = res?.data?.action;
//       const reasons = res?.data?.reasons;

//       if (action === 'deny') {
//         return { status: 'E-mail Not Approved', reasons };
//       } else if (action === 'allow') {
//         return { status: 'E-mail Approved' };
//       }

//       return { status: res?.status || 'Unknown', message: res?.message || '' };
//     } catch (err) {
//       console.error('❌ Verification Fetch Error:', err?.message || err);
//       return { status: 'Error', message: err?.message || 'Unknown error' };
//     }
//   };

//   return (
//     <VerifyEmailAddressContext.Provider value={{ verifyEmailAddress }}>
//       {children}
//     </VerifyEmailAddressContext.Provider>
//   );
// };

import { VerifyEmailAddressContext } from './VerifyEmailAddressContext'
import { useFetcher } from '../../hooks/useFetcher'

export const VerifyEmailProvider = ({ children }) => {
  const { fetcher } = useFetcher()

  const verifyEmailAddress = async (email) => {
    // ✅ Use your backend, not TrueGuard directly
    const apiBaseUrl = import.meta.env.VITE_API_EMAIL_URL

    console.log("ℹ️ Email verification request →", `${apiBaseUrl}/verification`)

    const res = await fetcher(`${apiBaseUrl}/verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, type: 'full' }),
    })

    console.log('📬 API Response:', res)

    try {
      if (res.data?.action === 'deny') {
        return {
          status: 'E-mail Not Approved',
          reasons: res.data.reasons || [],
        }
      }

      if (res.data?.action === 'allow') {
        return {
          status: 'E-mail Approved',
        }
      }

      return {
        status: res.status,
        message: res.message || res.error || 'Unexpected response',
      }
    } catch (err) {
      console.error('❌ Verification Error:', err.message)
      return {
        status: 'Error',
        message: err.message,
      }
    }
  }

  return (
    <VerifyEmailAddressContext.Provider value={{ verifyEmailAddress }}>
      {children}
    </VerifyEmailAddressContext.Provider>
  )
}
