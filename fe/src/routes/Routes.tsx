import { Route, Routes } from 'react-router-dom';
import App from '../App';
import { SignIn, SignUp, Dashboard } from '../pages';
import { RoutePaths } from './Routes.types';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path={RoutePaths.home} element={<SignIn />} />
      <Route path={RoutePaths.signIn} element={<SignIn />} />
      <Route path={RoutePaths.signUp} element={<SignUp />} />
      <Route path={`${RoutePaths.dashboard}/*`} element={<Dashboard />} />
    </Routes>
  );
};

export default RoutesComponent;
