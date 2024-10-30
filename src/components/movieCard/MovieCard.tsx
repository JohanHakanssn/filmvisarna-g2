import { Card } from 'react-bootstrap';
import PrimaryBtn from '../buttons/PrimaryBtn';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movieId: number;
  screeningId: number;
  posterUrl: string;
  age: number;
  title: string;
  startTime: string;
  showButton?: boolean;
  className?: string;
  confirmationButton?: boolean;
  smallFont?: boolean;
  hideAge?: boolean;
}

function MovieCard({
  posterUrl,
  age,
  title,
  startTime,
  movieId,
  screeningId,
  showButton = true,
  className,
  confirmationButton = false,
  smallFont = false,
  hideAge = false,
}: MovieCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/film/${movieId}`);
  };
  const handleButtonClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigate(`/visning/${screeningId}`);
  };
  const handleConfirmationLinkClick = () => {
    navigate('/bokning/:reservationNum');
  };

  return (
    <Card
      className={`text-center text-white border border-warning shadow movie-card py-2 ${className}`}
      onClick={handleCardClick}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={posterUrl}
          className="img-fluid p-2 card-img"
        />
        {!hideAge && (
          <div
            style={{ width: '1.5em', height: '1.5em' }}
            className="position-absolute bottom-0 end-0 bg-danger text-white digital m-2 border border-warning rounded-circle"
          >
            {age}
          </div>
        )}
      </div>
      <Card.Body className="p-1">
        <Card.Text className=" text-capitalize m-0 text-decoration-underline">
          {title}
        </Card.Text>
        <Card.Text className={`digital m-0 ${smallFont ? 'small-font' : ''}`}>
          {startTime}
        </Card.Text>
        {confirmationButton ? (
          <a
            href="#"
            onClick={handleConfirmationLinkClick}
            className="text-black text-decoration-underline small-font"
          >
            Visa bokning
          </a>
        ) : (
          showButton && (
            <PrimaryBtn onClick={handleButtonClick}>Boka</PrimaryBtn>
          )
        )}
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
