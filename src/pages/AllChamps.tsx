import { useEffect, useState } from "react";
import type { Champion } from "../types/Champion";
import { useNavigate } from "react-router-dom";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Col, Card, Button, Carousel, Container, Row } from "react-bootstrap";

const AllChamps = () => {
  const [champions, setChampions] = useState<Array<Champion>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/champions")
      .then((res) => setChampions(res.data))
      .catch(() => toast.error("Sikertelen"));
  }, []);

  const generateCard = (c: Champion) => {
    return (
      <Col>
        <Card style={{ width: "18rem" }}>
          <Carousel>
            {c.images?.map((l) => (
              <Carousel.Item>
                <img
                  src={`${BACKEND_URL}/images/${l}`}
                  width={500}
                  height={300}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body>
            <Card.Title>{c.name}</Card.Title>
            <Card.Text>{c.description}</Card.Text>
            <Button
              onClick={() => navigate(`/champions/${c.id}`)}
              variant="primary"
            >
              Megtekintés
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <Button onClick={() => navigate("/login")}>Login</Button> <br />
      <Button onClick={() => navigate("/add-champ")} variant="danger">
        Hozzáadás
      </Button>
      <Row xs={"auto"} md={"auto"} className="g-4">
        {champions.map((l) => generateCard(l))}
      </Row>
    </Container>
  );
};

export default AllChamps;
