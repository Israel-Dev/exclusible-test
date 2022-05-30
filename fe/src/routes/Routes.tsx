import { Route, Routes } from 'react-router-dom';
import App from '../App';
import { SignIn, SignUp } from '../pages';
import { RoutePaths } from './Routes.types';

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path={RoutePaths.home} element={<App />} />
      <Route path={RoutePaths.signIn} element={<SignIn />} />
      <Route path={RoutePaths.signUp} element={<SignUp />} />
    </Routes>
  );
};