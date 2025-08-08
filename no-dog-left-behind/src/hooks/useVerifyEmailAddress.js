import { useContext } from 'react';
import { VerifyEmailAddressContext } from '../contexts/VerifyEmailAddress/VerifyEmailAddressContext.jsx';

export const useVerifyEmailAddress = () =>
  useContext(VerifyEmailAddressContext);
