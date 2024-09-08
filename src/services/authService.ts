const login = async (email: string, password: string) => {
    // Example API request for login
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to login');
    }
  
    return response.json();
  };  
  export default login;
