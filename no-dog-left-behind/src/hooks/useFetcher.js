import { useContext } from 'react';
import { FetcherContext } from '../contexts/Fetcher/FetcherContext';

export const useFetcher = () => useContext(FetcherContext);
