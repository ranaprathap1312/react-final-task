import { servicesData } from '../../data/servicesData';
import ServiceSubView from '../../components/services/ServiceSubView';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const DiningSubPage = () => {
  useDocumentTitle('Michelin Gastronomy & Wine Cellar');
  return <ServiceSubView serviceData={servicesData.dining} categoryKey="dining" />;
};

export default DiningSubPage;
