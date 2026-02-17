import { useState } from "react";
import type { User } from "../types/User";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ username: "", password: "" }); //admin - admin

  const submit = () => {
    apiClient
      .post("/login", user)
      .then(() => {
        localStorage.setItem("credentials", JSON.stringify(user));
        toast.success("Sikeres");
        navigate("/");
      })
      .catch(() => toast.error("Sikertelen"));
  };
  return (
    <>
      <input
        type="text"
        value={user.username}
        placeholder="Email"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="password"
        value={user.password}
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button onClick={submit} variant="success">
        Bejelentkezés
      </Button>
    </>
  );
};

export default LoginPage;
