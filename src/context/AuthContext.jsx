// /**
//  * AuthContext.jsx
//  * ---------------
//  * Provides authentication state across the entire app.
//  *
//  * In the real app, login/register would send requests to Django backend:
//  *   POST /api/users/register/
//  *   POST /api/users/login/
//  *
//  * Here we simulate it with localStorage for demonstration.
//  */

// import { createContext, useContext, useState, useEffect } from "react";

// // Create the context object
// const AuthContext = createContext(null);

// // Storage key for users and current session
// const USERS_KEY = "urban_home_users";
// const SESSION_KEY = "urban_home_session";

// /**
//  * AuthProvider wraps the app and provides auth state + functions
//  */
// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // On app load, check if user is already logged in
//   useEffect(() => {
//     const session = localStorage.getItem(SESSION_KEY);
//     if (session) {
//       setUser(JSON.parse(session));
//     }
//     setLoading(false);
//   }, []);

//   /**
//    * Register a new user
//    * Returns { success, message }
//    */
//   function register(userData) {
//     const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

//     // Check if email already exists
//     const exists = users.find((u) => u.email === userData.email);
//     if (exists) {
//       return { success: false, message: "Email already registered!" };
//     }

//     // Create new user with an ID
//     const newUser = {
//       id: Date.now(),
//       name: userData.name,
//       email: userData.email,
//       password: userData.password, // In real app, Django hashes this
//       phone: userData.phone || "",
//       address: userData.address || "",
//     };

//     users.push(newUser);
//     localStorage.setItem(USERS_KEY, JSON.stringify(users));

//     // Auto-login after registration
//     const sessionUser = { ...newUser };
//     delete sessionUser.password; // Don't store password in session
//     setUser(sessionUser);
//     localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

//     return { success: true, message: "Registration successful!" };
//   }

//   /**
//    * Login with email and password
//    * Returns { success, message }
//    */
//   function login(email, password) {
//     const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

//     const found = users.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (!found) {
//       return { success: false, message: "Invalid email or password!" };
//     }

//     const sessionUser = { ...found };
//     delete sessionUser.password;
//     setUser(sessionUser);
//     localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

//     return { success: true, message: "Login successful!" };
//   }

//   /**
//    * Logout the current user
//    */
//   function logout() {
//     setUser(null);
//     localStorage.removeItem(SESSION_KEY);
//   }

//   /**
//    * Update user profile
//    */
//   function updateProfile(updatedData) {
//     const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
//     const updatedUsers = users.map((u) =>
//       u.id === user.id ? { ...u, ...updatedData } : u
//     );
//     localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

//     const sessionUser = { ...user, ...updatedData };
//     setUser(sessionUser);
//     localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
//   }

//   // The value object that all children can access
//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     updateProfile,
//     isAuthenticated: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// /**
//  * Custom hook to use auth context
//  * Usage: const { user, login, logout } = useAuth();
//  */
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }







import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const SESSION_KEY = "servicelink_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);

    if (session) {
      setUser(JSON.parse(session));
    }

    setLoading(false);
  }, []);

  async function register(userData) {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message:
            data.errors
              ? Object.values(data.errors).flat().join(", ")
              : "Registration failed",
        };
      }

      const sessionUser = data.user;

      setUser(sessionUser);
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(sessionUser)
      );

      return {
        success: true,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to connect to server.",
      };
    }
  }

  async function login(email, password) {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Login failed",
        };
      }

      const sessionUser = data.user;

      setUser(sessionUser);

      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(sessionUser)
      );

      return {
        success: true,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to connect to server.",
      };
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }

  async function updateProfile(updatedData) {
    const updatedUser = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(updatedUser)
    );
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}






