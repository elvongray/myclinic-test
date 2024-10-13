import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import "react-datepicker/dist/react-datepicker.css";

function ListCreatePage() {
  const [validated, setValidated] = useState(false);
  const [from, setFrom] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tickets, setTickets] = useState([]);
  let { username } = useParams();

  const getData = async () => {
    const response = await axios.get(`http://localhost:8000/tickets/${username}/`);
    setTickets(response.data);
  };

  useEffect(() => {
    getData()
  }, []);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post(
          `http://localhost:8000/tickets/${username}/`,
          {
            'origin': from,
            'destination': destination,
            'departure_date': startDate,
            'return_date': endDate,
          }
        )

        setTickets([...tickets, response.data])
      } catch (e) {
        console.log(e)
      }
    }
    setValidated(true);
  };

  const bookTicket = async (ticket) => {
    try {
      await axios.put(
        `http://localhost:8000/tickets/ticket/${ticket.ticket_id}/`,
        {
          ...ticket,
          'booked': true
        }
      )

      await getData()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container fluid className='App container'>
      <header className="App-header">
        <h1 className="text-3xl font-bold">
          Book Tickets
        </h1>
      </header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 offset-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Control
              required
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Control
              required
              type="text"
              placeholder="To"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3 offset-3">
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Departure Date</Form.Label>
            <DatePicker required selected={startDate} onChange={(date) => setStartDate(date)} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Return Date</Form.Label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Create ticket</Button>
      </Form>
      <Row>
        <Table responsive="sm" className='tickets-table'>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>From</th>
              <th>Destination</th>
              <th>Departure date</th>
              <th>Return date</th>
              <th>Booked</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticket_id}>
                <td>{ticket.ticket_id.split('-')[0]}</td>
                <td>{ticket.origin}</td>
                <td>{ticket.destination}</td>
                <td>{ticket.departure_date.split('T')[0]}</td>
                <td>{ticket.return_date && ticket.return_date.split('T')[0]}</td>
                <td>{ticket.booked ? 'True' : 'False'}</td>
                <td>
                  {
                    !ticket.booked &&
                    <Button onClick={() => bookTicket(ticket)}>Book</Button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default ListCreatePage;