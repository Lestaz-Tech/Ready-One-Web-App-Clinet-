import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data?.session ?? null);
      setUser(data?.session?.user ?? null);
      setLoading(false);
    }).catch(() => setLoading(false));

    // Subscribe to changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const refreshUser = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      if (data?.session) {
        setSession(data.session);
        setUser(data.session.user);
        return data.session.user;
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      return null;
    }
  };

  const signUp = async ({ phone, email, password, fullName }) => {
    try {
      // For phone-based signup, use email + password (Supabase doesn't support pure phone signup with password)
      // Phone will be stored in user metadata
      if (phone && !email) {
        // If only phone provided, derive an email or use phone@ready-one.local
        const derivedEmail = `${phone}@ready-one.local`;
        const response = await supabase.auth.signUp({
          email: derivedEmail,
          password,
          options: {
            data: {
              full_name: fullName,
              phone
            }
          }
        });
        return response;
      }

      // Standard email + password signup
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone
          }
        }
      });
      return response;
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async ({ phone, email, password }) => {
    try {
      // Dev-only shortcut: allow quick local dev login using email 'dev@ready-one.local' + password 'dev'
      if (process.env.NODE_ENV !== 'production' && email === 'dev@ready-one.local' && password === 'dev') {
        const devUser = {
          id: 'dev-user-' + Date.now(),
          email,
          user_metadata: { full_name: 'Dev User' }
        };
        setUser(devUser);
        setSession({ user: devUser, access_token: 'dev-token' });
        return { data: { user: devUser, session: { user: devUser, access_token: 'dev-token' } }, error: null };
      }

      // Sign in with email+password
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      });

      return response;
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const sendReset = async ({ email, phone }) => {
    try {
      if (phone && !email) {
        email = `${phone}@ready-one.local`;
      }
      return supabase.auth.resetPasswordForEmail(email);
    } catch (error) {
      return { data: null, error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    sendReset,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
