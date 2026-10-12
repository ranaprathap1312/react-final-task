import { servicesData } from '../../data/servicesData';
import ServiceSubView from '../../components/services/ServiceSubView';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const EventsSubPage = () => {
  useDocumentTitle('Weddings, Galas & Summits');
  return <ServiceSubView serviceData={servicesData.events} categoryKey="events" />;
};

export default EventsSubPage;
