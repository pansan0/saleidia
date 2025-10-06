import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient(supabaseUrl, publicAnonKey);

// Auth helper functions
export const signUp = async (email: string, password: string, userData: { name: string; type: 'creator' | 'buyer'; interests: string[]; personality: string }) => {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/make-server-60f140bd/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        email,
        password,
        userData
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Signup error: ${result.error || 'Unknown error'}`);
    }

    return result;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(`Sign in error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(`Sign out error: ${error.message}`);
    }
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw new Error(`Session error: ${error.message}`);
    }
    return data.session;
  } catch (error) {
    console.error('Session error:', error);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(`Get user error: ${error.message}`);
    }
    return data.user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};