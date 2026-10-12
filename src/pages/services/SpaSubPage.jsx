import { servicesData } from '../../data/servicesData';
import ServiceSubView from '../../components/services/ServiceSubView';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const SpaSubPage = () => {
  useDocumentTitle('Lotus Ayurvedic Spa & Thalassotherapy');
  return <ServiceSubView serviceData={servicesData.spa} categoryKey="spa" />;
};

export default SpaSubPage;
