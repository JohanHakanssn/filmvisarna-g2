import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import Rubrik from '../../components/rubrik/Rubrik';

interface RegisterFormValues {
  user_email: string;
  user_password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await axios.post('/api/register', data);
      navigate('/');
    } catch (err: any) {
      console.error('Något gick fel', err);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const password = watch('user_password');

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center mb-4">
          <Rubrik title="Bli Medlem" />
        </div>
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field-container">
                  <label htmlFor="user_email" className="form-label">
                    E-post
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    className="form-control"
                    {...register('user_email', { required: 'E-post krävs' })}
                    placeholder="Ange din e-post"
                  />
                  {errors.user_email && (
                    <span>{errors.user_email.message}</span>
                  )}
                </div>

                <div className="field-container">
                  <label htmlFor="user_password" className="form-label">
                    Lösenord
                  </label>
                  <input
                    type="password"
                    id="user_password"
                    className="form-control"
                    {...register('user_password', {
                      required: 'Lösenord krävs',
                    })}
                    placeholder="Ange ditt lösenord"
                  />
                  {errors.user_password && (
                    <span>{errors.user_password.message}</span>
                  )}
                </div>

                <div className="field-container">
                  <label htmlFor="confirm_password" className="form-label">
                    Repetera lösenord
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    className="form-control"
                    {...register('confirm_password', {
                      validate: (value) =>
                        value === password || 'Lösenorden matchar inte',
                    })}
                    placeholder="Upprepa ditt lösenord"
                  />
                  {errors.confirm_password && (
                    <span>{errors.confirm_password.message}</span>
                  )}
                </div>

                <div className="field-container">
                  <label htmlFor="first_name" className="form-label">
                    Förnamn
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="form-control"
                    {...register('first_name', { required: 'Förnamn krävs' })}
                    placeholder="Ange ditt förnamn"
                  />
                  {errors.first_name && (
                    <span>{errors.first_name.message}</span>
                  )}
                </div>

                <div className="field-container">
                  <label htmlFor="last_name" className="form-label">
                    Efternamn
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="form-control"
                    {...register('last_name', { required: 'Efternamn krävs' })}
                    placeholder="Ange ditt efternamn"
                  />
                  {errors.last_name && <span>{errors.last_name.message}</span>}
                </div>

                <div className="button-group">
                  <PrimaryBtn title="Avbryt" onClick={handleGoBack} />
                  <PrimaryBtn title="Bli medlem" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
