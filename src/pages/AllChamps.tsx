import { useEffect, useState } from "react";
import type { Champion } from "../types/Champion";
import { useNavigate } from "react-router-dom";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import {
  Col,
  Card,
  Button,
  Carousel,
  Container,
  Row,
  Nav,
  Navbar,
} from "react-bootstrap";

const AllChamps = () => {
  const [champions, setChampions] = useState<Array<Champion>>([]);
  const [fav, setFav] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("fav") ?? "[]"),
  );
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/champions")
      .then((res) => setChampions(res.data))
      .catch(() => toast.error("Sikertelen"));
  }, []);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  const generateCard = (c: Champion) => {
    return (
      <Col>
        <Card style={{ width: "18rem" }}>
          <Carousel>
            {c.images.map((l) => (
              <Carousel.Item>
                <img
                  src={`${BACKEND_URL}/images/${l}`}
                  width={285}
                  height={160}
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
            </Button>{" "}
            <br />
            <Button
              onClick={() => {
                setFav([...fav, Number(c.id)]);
                toast.success("Sikeresen kedvenc lett");
              }}
              variant="dark"
            >
              ❤️
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React LoL Champs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/add-champ">Hozzáadás</Nav.Link>
              <Nav.Link href="/fav-page">Kedvencek</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row xs={"auto"} md={"auto"} className="g-4">
        {champions.map((l) => generateCard(l))}
      </Row>
    </Container>
  );
};

export default AllChamps;
