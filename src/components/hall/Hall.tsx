import React, { useState } from 'react';
import { CardImg, Col, Container, Row } from 'react-bootstrap';
import { getAffectedSeats, type Seat } from './hallHelpers';

interface HallProps {
  seats: Seat[][];
  poster: string;
  numPersons: number;
  seatIds: number[];
  setSeatIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function Hall({ seats, poster, numPersons, seatIds, setSeatIds }: HallProps) {
  const [hovered, setHovered] = useState<number[]>([]);

  const handleClick = (seatIndex: number, row: Seat[]) => {
    console.log({ seatIndex, row, clicked: row[seatIndex] });

    setSeatIds(
      getAffectedSeats(row, seatIndex, numPersons).map((seat) => seat.seatId)
    );
  };

  const handleMouseEnter = (seatIndex: number, row: Seat[]) => {
    setHovered(
      getAffectedSeats(row, seatIndex, numPersons).map((seat) => seat.seatId)
    );
  };

  return (
    <Container className="d-flex flex-column bg-rosa py-2 align-items-center rounded gap-1">
      <Row className="justify-content-center">
        <Col className="col-6">
          <CardImg src={poster} className="rounded" />
        </Col>
      </Row>
      {seats.map((row, rowIndex) => {
        return (
          <Row
            key={rowIndex}
            className="justify-content-center"
            onMouseLeave={() => setHovered([])}
          >
            {row.map(({ seatId, free }, i) => (
              <Col
                key={seatId}
                onClick={() => handleClick(i, row)}
                onMouseEnter={() => handleMouseEnter(i, row)}
                className={`border d-flex align-items-center justify-content-center p-2 rounded seat 
                  ${!free ? 'bg-rosa border-light' : seatIds.includes(seatId) ? 'bg-success' : 'bg-light'} ${hovered.includes(seatId) ? 'seat-hover' : ''}
                `}
              />
            ))}
          </Row>
        );
      })}
    </Container>
  );
}

export default Hall;
