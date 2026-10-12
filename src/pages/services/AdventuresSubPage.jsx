import { servicesData } from '../../data/servicesData';
import ServiceSubView from '../../components/services/ServiceSubView';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AdventuresSubPage = () => {
  useDocumentTitle('Ocean Expeditions & Aerial Charters');
  return <ServiceSubView serviceData={servicesData.adventures} categoryKey="adventures" />;
};

export default AdventuresSubPage;
