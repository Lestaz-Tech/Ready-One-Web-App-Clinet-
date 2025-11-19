import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user ?? null);
      setLoading(false);
    }).catch(() => setLoading(false));

    // Subscribe to changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const signUp = async ({ phone, email, password, fullName }) => {
    // Prefer phone-based signup if phone provided (OTP) otherwise email
    if (phone) {
      // sign up using phone OTP - requires Supabase to have phone signups enabled
      const response = await supabase.auth.signUp({ phone, password, options: { data: { full_name: fullName, email } } });
      return response;
    }
    const response = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, phone } } });
    return response;
  };

  const signIn = async ({ phone, email, password }) => {
    // Dev-only shortcut: allow quick local dev login using phone+password both set to 0798940935
    // This is explicitly gated to non-production environments.
    if (process.env.NODE_ENV !== 'production' && phone === '0798940935' && password === '0798940935') {
      const devUser = {
        id: 'dev-user',
        phone,
        email: email || null,
        user_metadata: { full_name: 'Dev User' }
      };
      setUser(devUser);
      return { data: { user: devUser }, error: null };
    }

    // sign in with password - supabase supports email+password and phone+password
    if (phone) {
      return supabase.auth.signInWithPassword({ phone, password });
    }
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const sendReset = async ({ email, phone }) => {
    if (phone) {
      // Send OTP for phone sign-in (passwordless) — this behavior depends on your Supabase settings
      return supabase.auth.signInWithOtp({ phone });
    }
    return supabase.auth.resetPasswordForEmail(email);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    sendReset
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
