export interface UserProfile {
    loginToken: string
    id: string;
    email: string;
    picture: string;
    name: string;
  }
  
export interface AuthContextType {
    isLoggedIn: boolean;
    userProfile: UserProfile | null;
    login: (googl_token: string) => void;
    logout: () => void;
  }
