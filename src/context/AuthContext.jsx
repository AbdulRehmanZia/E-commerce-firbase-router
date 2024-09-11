import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "../utilis/firebase";
import { auth } from "../utilis/firebase";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isLogin: false,
    userInfo: {},
  });

  const [loading, setLoading] = useState(true);

  function onAuthChanged(user) {
    if(user){
        console.log(user);
        
        setUser({isLogin: true, userInfo:{
            name: user?.displayName,
            email: user.email,
            photoURL: user.photoURL
        }})
   
    
    }
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? (
        <div className="flex justify-center items-center w-full h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
