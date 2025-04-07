import { useLoader } from '../context/LoaderContext';

export const useLoading = () => {
  const { showLoader, hideLoader } = useLoader();

  const withLoading = async (callback) => {
    try {
      showLoader();
      const result = await callback();
      return result;
    } finally {
      hideLoader();
    }
  };

  return { withLoading };
}; 