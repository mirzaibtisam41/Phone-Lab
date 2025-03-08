import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function NotFound({user}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (user?.role === 'user') {
      navigate('/shop/home');
    } else {
      navigate('/shop/home');
    }
  }, [user, navigate]); // Runs only when `user` changes

  // return <div>Page doesn't exist</div>;
}

export default NotFound;
