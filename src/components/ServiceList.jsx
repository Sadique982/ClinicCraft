import ServiceCard from './ServiceCard';

const ServiceList = ({ services, onEdit, onDelete }) => {
  return (
    <div className='mx-5 grid gap-6 md:grid-cols-2'>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ServiceList;
