import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Champion } from "../types/Champion";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Carousel } from "react-bootstrap";

const OneChamp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [champ, setChamp] = useState<Champion>();
  const isLogged = () => localStorage.getItem("credentials") !== null;

  useEffect(() => {
    apiClient
      .get(`/champions/${id}`)
      .then((res) => setChamp(res.data))
      .catch(() => toast.error("Gatya"));
  }, [id]);

  const deleteChamp = () => {
    if (!isLogged()) return;

    apiClient
      .delete(`/champions/${id}`)
      .then(() => {
        toast.success("Sikeres");
        navigate("/");
      })
      .catch(() => toast.error("Sikertelen"));
  };
  return (
    <>
      <Carousel>
        {champ?.images.map((l) => (
          <Carousel.Item>
            <img src={`${BACKEND_URL}/images/${l}`} width={500} height={300} />
          </Carousel.Item>
        ))}
      </Carousel>
      <h2>{champ?.name}</h2>
      <h2>{champ?.description}</h2>
      <Button onClick={deleteChamp} variant="danger">
        Törlés
      </Button>
    </>
  );
};

export default OneChamp;
