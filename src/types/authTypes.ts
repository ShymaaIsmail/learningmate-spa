export interface UserProfile {
    loginToken: string
    id: string;
    email: string;
    name: string;
    picture: string;

  }
  
export interface AuthContextType {
    isLoggedIn: boolean;
    userProfile: UserProfile | null;
    login: (googl_token: string) => void;
    logout: () => void;
  }
