export interface UserProfile {
    email: string;
    name: string;
    picture: string;
  }
  
export interface AuthContextType {
    isLoggedIn: boolean;
    userProfile: UserProfile | null;
    login: (profile: UserProfile) => void;
    logout: () => void;
  }
