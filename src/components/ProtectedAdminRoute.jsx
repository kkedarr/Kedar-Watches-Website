// @ts-nocheck
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function ProtectedAdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
  async function checkAuth() {
    console.log("Checking admin authentication...");

    // 1. Check logged-in user
    const { data: authData, error: authError } = await supabase.auth.getUser();

    console.log("Auth data:", authData);
    console.log("Auth error:", authError);

    const user = authData?.user;

    if (!user) {
      console.log("No user found, redirecting to login");
      setAuthorized(false);
      setLoading(false);
      return;
    }

    // 2. Check role table
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("id", user.id)
      .single();

    console.log("Role data:", roleData);
    console.log("Role error:", roleError);

    if (roleData?.role === "admin") {
      console.log("User is admin — access granted.");
      setAuthorized(true);
    } else {
      console.log("User is NOT admin — access denied.");
      setAuthorized(false);
    }

    setLoading(false);
  }

  checkAuth();
}, []);


  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!authorized) return <Navigate to="/admin/login" replace />;

  return children;
}