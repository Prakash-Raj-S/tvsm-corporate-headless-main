import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function useUtmParams() {
  const query = useQuery();
  return {
    utm_source: query.get('utm_source'),
    utm_medium: query.get('utm_medium'),
    utm_campaign: query.get('utm_campaign'),
    utm_term: query.get('utm_term'),
    utm_content: query.get('utm_content'),
  };
}
