import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => {
    set({ session, user: session?.user ?? null });
  },
  setLoading: (loading) => set({ loading }),
  signOut: async () => {
    try {
      // Clean up auth state
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      // Reset state
      set({ user: null, session: null });
      
      // Force page reload for clean state
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
      // Force redirect even if signout fails
      window.location.href = '/auth';
    }
  },
  initialize: () => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const { setSession, setLoading } = get();
        setSession(session);
        setLoading(false);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // Defer any additional data fetching to prevent deadlocks
          setTimeout(() => {
            // Future: Load user profile data here
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const { setSession, setLoading } = get();
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  },
}));