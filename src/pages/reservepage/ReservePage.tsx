import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
} from 'react-router-dom';
import { getScreeningDataQuery, reserveLoader } from '../../api/reserve';
import { getRootDataQuery } from '../../api/root';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import Hall from '../../components/hall/Hall';
import TicketSelector from '../../components/hall/TicketSelector';
import { toast } from 'react-toastify';

function ReservePage() {
  const [email, setEmail] = useState('');
  const [seatIds, setSeatIds] = useState<number[]>([]);
  const [ticketIds, setTicketIds] = useState<number[]>([]);
  const submit = useSubmit();

  const { screeningId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof reserveLoader>>
  >;
  const { data } = useSuspenseQuery(getScreeningDataQuery(screeningId));
  const {
    data: { isLoggedIn },
  } = useSuspenseQuery(getRootDataQuery());

  const error = useActionData() as unknown as string | Response;
  useEffect(() => {
    if (typeof error === 'string') toast.warning(error);
  }, [error]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // 1. Submit reservation details to create the booking
    submit({ seatIds, ticketIds, email }, { method: 'POST' });

    // 2. Trigger confirmation email with booking details
    await sendConfirmationEmail(email);
  };

  const sendConfirmationEmail = async (recipientEmail: string) => {
    const emailDetails = {
      to: recipientEmail,
      subject: 'Tack för din bokning hos Filmvisarna!',
      text: 'Tack för din bokning hos Filmvisarna! Vi ser fram emot att välkomna dig.',
      html: `
        <div style="font-family: Arial; line-height: 1.6;">
          <h1>Filmvisarna</h1>
          <h2>Tack för din bokning!</h2>
          <p>Vi är glada att bekräfta din bokning. Här är en sammanfattning:</p>
          <!-- Add booking summary here -->
        </div>
      `,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailDetails),
      });

      if (response.ok) toast.success('Bekräftelse skickad!');
      else toast.error('Fel vid e-postskick.');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      toast.error('E-postfel');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row gy-2 align-items-center">
      <Col className="col-12 col-lg-6">
        <Container
          fluid
          className="bg-rosa rounded d-flex flex-column gap-4 text-dark p-3"
        >
          <h2 className="text-decoration-underline">{data.title}</h2>
          <h4 className="cap-first">
            {data.date} {data.time}
          </h4>
          <TicketSelector tickets={data.tickets} setTicketIds={setTicketIds} />
          {!isLoggedIn && (
            <Row>
              <Col className="field-container">
                <label htmlFor="email" className="form-label">
                  E-post
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-field"
                  placeholder="Ange din e-postadress"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>
          )}
        </Container>
      </Col>
      <Col className="d-flex flex-column gap-3 col-12 col-lg-6">
        <Hall
          seats={data.seats}
          poster={data.poster}
          numPersons={ticketIds.length}
          seatIds={seatIds}
          setSeatIds={setSeatIds}
        />
        <div className="button-group">
          <PrimaryBtn>
            <Link to="/">Ångra</Link>
          </PrimaryBtn>
          <PrimaryBtn
            type="submit"
            disabled={
              ticketIds.length === 0 || ticketIds.length !== seatIds.length
            }
          >
            Boka
          </PrimaryBtn>
        </div>
      </Col>
    </form>
  );
}

export default ReservePage;