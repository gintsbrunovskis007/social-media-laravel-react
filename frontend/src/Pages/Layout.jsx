import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          {user ? (
            <div>
              Welcome back <strong>{user.name}</strong>
              <div>
                <form onSubmit={handleLogout}>
                  <button>Logout</button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <Link to="/register">Register</Link>
              </div>
              <div>
                <Link to="/login">Login</Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
