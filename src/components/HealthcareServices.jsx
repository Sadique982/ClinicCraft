import { useState, useEffect } from 'react';
import ServiceDialog from './ServiceDialog';
import ServiceList from './ServiceList';
import EmptyState from './EmptyState';
import { CirclePlus } from 'lucide-react';

export default function HealthcareServices() {
  const [serviceList, setServiceList] = useState([
    {
      name: 'General Checkup',
      description: 'A comprehensive health assessment to monitor and maintain overall health.',
      price: 50,
      id: 1,
    },
    {
      name: 'Cancer Screening',
      description:
        'Early detection tests for various types of cancers, including breast, prostate, and colon cancer.',
      price: 150,
      id: 2,
    },
    {
      name: 'Colonoscopy',
      description:
        'An examination of the colon and rectum to detect colorectal cancer and other abnormalities.',
      price: 300,
      id: 3,
    },
  ]);

  const [currentService, setCurrentService] = useState({
    name: '',
    description: '',
    price: 0,
  });
  const [serviceToEditId, setServiceToEditId] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const savedServices = localStorage.getItem('healthcareServices');
    if (savedServices) {
      setServiceList(JSON.parse(savedServices));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('healthcareServices', JSON.stringify(serviceList));
  }, [serviceList]);

  const handleServiceSubmit = (serviceData) => {
    if (serviceData.name && serviceData.description && serviceData.price > 0) {
      if (serviceToEditId !== null) {
        setServiceList(
          serviceList.map((service) =>
            service.id === serviceToEditId ? { ...serviceData, id: serviceToEditId } : service
          )
        );
        console.log(`${serviceData.name} has been successfully updated.`);
      } else {
        setServiceList([...serviceList, { ...serviceData, id: Date.now() }]);
        console.log(`${serviceData.name} has been successfully added.`);
      }
      resetForm();
    } else {
      alert('Please fill in all fields and ensure the price is greater than 0.');
    }
  };

  const resetForm = () => {
    setCurrentService({ name: '', description: '', price: 0 });
    setIsDialogVisible(false);
    setServiceToEditId(null);
  };

  const handleServiceDelete = (id) => {
    const serviceToDelete = serviceList.find((service) => service.id === id);
    setServiceList(serviceList.filter((service) => service.id !== id));
    console.log(`${serviceToDelete?.name} has been removed from the list.`);
  };

  const handleServiceEdit = (service) => {
    setCurrentService({
      name: service.name,
      description: service.description,
      price: service.price,
      id: service.id,
    });
    setServiceToEditId(service.id);
    setIsDialogVisible(true);
  };

  return (
    <div className='m-5 text-center'>
      <h1 className='text-gray-800 text-4xl font-bold'>Healthcare Services Management</h1>
      <p className='mt-1 text-xl text-gray-500'>Manage your healthcare services with ease</p>

      <button
        onClick={() => {
          resetForm(); // Reset the form before opening the dialog
          setIsDialogVisible(true);
        }}
        className='flex mx-auto items-center bg-black text-white my-10 px-5 py-2 rounded-md text-base transition-opacity  hover:opacity-75'
      >
        <CirclePlus size={20} className='mr-2' />
        Add New Service
      </button>

      <ServiceList
        services={serviceList}
        onEdit={handleServiceEdit}
        onDelete={handleServiceDelete}
      />
      {serviceList.length === 0 && <EmptyState />}

      <ServiceDialog
        isOpen={isDialogVisible}
        onClose={resetForm} // Use the reset function to close the dialog
        service={currentService}
        onSubmit={handleServiceSubmit}
      />
    </div>
  );
}
