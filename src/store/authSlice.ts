// import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {
//   clearAllCookies,
//   COOKIE_CONFIG,
//   getCookie,
//   setCookie,
// } from '../utils/cookie';
// import { apiSlice } from '../api/api';
// import { RootState } from './store';

// interface User {
//   id: string;
// }

// interface IAuthStateReturn {
//   userId: string | null;
//   isLoggedIn: boolean;
// }

// interface LoginPayload {
//   accessToken: string;
//   refreshToken: string;
//   userId: string;
//   isManpowerLoggedIn: boolean;
// }

// interface AuthState {
//   user: User | null;
//   isLoggedIn: boolean;
// }

// const getInitialState = (): AuthState => {
//   try {
//     const userId = localStorage.getItem('userId');
//     const refreshToken = getCookie(COOKIE_CONFIG.refreshToken);
//     if (userId && refreshToken) {
//       return {
//         user: { id: userId },
//         isLoggedIn: true,
//       };
//     } else {
//       clearAllCookies();
//       return {
//         user: null,
//         isLoggedIn: false,
//       };
//     }
//   } catch (e) {
//     console.error(e);
//     return {
//       user: null,
//       isLoggedIn: false,
//     };
//   }
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: getInitialState(),
//   reducers: {
//     loginUser: (state, action: PayloadAction<LoginPayload>) => {
//       state.user = { id: action.payload.userId };
//       state.isLoggedIn = true;

//       localStorage.setItem('userId', action.payload.userId);
//       setCookie({
//         cookieName: COOKIE_CONFIG.accessToken,
//         value: action.payload.accessToken,
//         expiresIn:
//           action.payload.isManpowerLoggedIn === false
//             ? undefined
//             : COOKIE_CONFIG.accessTokenExpiryDuration,
//       });
//       setCookie({
//         cookieName: COOKIE_CONFIG.refreshToken,
//         value: action.payload.refreshToken,
//         expiresIn:
//           action.payload.isManpowerLoggedIn === false
//             ? undefined
//             : COOKIE_CONFIG.refreshTokenExpiryDuration,
//       });
//     },

//     logoutUser: (state) => {
//       state.user = null;
//       state.isLoggedIn = false;
//       clearAllCookies();
//       apiSlice.util.resetApiState();
//     },

//     setUser: (state, action: PayloadAction<User>) => {
//       state.user = action.payload;
//       state.isLoggedIn = true;
//     },
//   },
// });

// export const getAuthState = createSelector(
//   (state: RootState) => state.auth,
//   (authState: AuthState): IAuthStateReturn => ({
//     userId: authState?.user?.id || null,
//     isLoggedIn: authState?.isLoggedIn,
//   })
// );

// export const { loginUser, logoutUser, setUser } = authSlice.actions;
// export default authSlice.reducer;
