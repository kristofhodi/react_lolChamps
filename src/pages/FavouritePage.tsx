import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Champion } from "../types/Champion";
import { Button, Table } from "react-bootstrap";

const FavouritePage = () => {
  const [champions, setChampions] = useState<Array<Champion>>([]);
  const [fav, setFav] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("fav") ?? "[]"),
  );
  useEffect(() => {
    apiClient
      .get("/champions")
      .then((res) => setChampions(res.data))
      .catch(() => toast.error("Sikertelen"));
  }, []);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  const removeChamp = (searchedIndex: number) => {
    setFav(fav.filter((_, i) => i !== searchedIndex));
  };

  return (
    <>
      {fav.length > 0 ? (
        <>
          <Table>
            <thead>
              <th>Név</th>
              <th>Blue_essence</th>
              <th>Törlés</th>
            </thead>
            <tbody>
              {fav.map((id, index) => {
                const favourite = champions.find((c) => c.id == id);

                return (
                  <>
                    <tr>
                      <td> {favourite?.name}</td>
                      <td>{favourite?.blue_essence}</td>
                      <td>
                        <Button
                          onClick={() => removeChamp(index)}
                          variant="danger"
                        >
                          Törlés
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
          <Button onClick={() => setFav([])} variant="danger">
            Ürítés
          </Button>
        </>
      ) : (
        <>
          <h1>Nincsenek még kedvencek</h1>
        </>
      )}
    </>
  );
};

export default FavouritePage;
