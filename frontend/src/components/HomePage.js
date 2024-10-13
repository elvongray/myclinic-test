import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    if (!username) return;
    navigate(`/tickets/${username}`);
  }

  return (
    <Container fluid className='App container'>
      <div>
        <header className="App-header">
          <h1 className="text-3xl font-bold">
            Book Tickets
          </h1>
        </header>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter username to list and create your tickets"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default HomePage;
