import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

//accessing the updatedlink that bash script writes to database
var userURL = process.env.NEXT_PUBLIC_PROD_URL + "/createUser";

const Navbar = function () {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  //TO DO create a usersign-up to create an option for usernames
  const handleSignUp = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  useEffect(() => {
    if (user != null) {
      try {
        fetch(userURL + "?userId=" + user.uid + "&username=" + user.displayName, {
          method: 'POST', 
          mode: "no-cors",
          headers: {
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*'
          }
        }).then(
          postRes => { console.log(postRes.json()) }
        );
      } catch{(error) => {
            console.error('Error:', error);
        };
      };
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        {!user ? null : (
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        )}
      </ul>

      {loading ? null : !user ? (
        <ul>
          <li onClick={handleSignIn}>
            Login
          </li>
          <li onClick={handleSignUp}>
            Sign up
          </li>
        </ul>
      ) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;