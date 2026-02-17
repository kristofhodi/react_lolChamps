import { useState } from "react";
import type { Champion } from "../types/Champion";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddChamp = () => {
  const navigate = useNavigate();
  const [champ, setChamp] = useState<Champion>({
    name: "",
    role: "",
    lane: "",
    difficulty: 0,
    blue_essence: 0,
    damage_type: "",
    images: [],
    description: "",
  });

  const submit = () => {
    apiClient
      .post("/champions", champ)
      .then(() => {
        toast.success("Sikeres");
        navigate("/");
      })
      .catch(() => toast.error("Sikertelen"));
  };

  return (
    <>
      <h2>Név</h2>
      <input
        type="text"
        value={champ.name}
        onChange={(e) => setChamp({ ...champ, name: e.target.value })}
      />
      <h2>Role</h2>
      <input
        type="text"
        value={champ.role}
        onChange={(e) => setChamp({ ...champ, role: e.target.value })}
      />
      <h2>Lane</h2>
      <input
        type="text"
        value={champ.lane}
        onChange={(e) => setChamp({ ...champ, lane: e.target.value })}
      />
      <h2>Difficulty</h2>
      <input
        type="number"
        value={champ.difficulty}
        onChange={(e) =>
          setChamp({ ...champ, difficulty: Number(e.target.value) })
        }
      />
      <h2>Blue essence</h2>
      <input
        type="number"
        value={champ.blue_essence}
        onChange={(e) =>
          setChamp({ ...champ, blue_essence: Number(e.target.value) })
        }
      />
      <h2>Damage_type</h2>
      <input
        type="text"
        value={champ.damage_type}
        onChange={(e) => setChamp({ ...champ, damage_type: e.target.value })}
      />
      <h2>Description</h2>
      <input
        type="text"
        value={champ.description}
        onChange={(e) => setChamp({ ...champ, description: e.target.value })}
      />
      <Button onClick={submit}>Hozzáadás</Button>
    </>
  );
};

export default AddChamp;
