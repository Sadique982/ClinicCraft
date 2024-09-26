import { useEffect, useState } from 'react';

const ServiceDialog = ({ isOpen, onClose, service, onSubmit }) => {
  const [localService, setLocalService] = useState(service);

  useEffect(() => {
    setLocalService(service);
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalService((prevService) => ({
      ...prevService,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(localService);
  };

  return isOpen ? (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 w-full'>
      <div className='bg-white px-5 py-6 rounded-lg shadow-lg'>
        <h2 className='flex mb-3 font-extrabold text-xl'>
          {service.id ? 'Update Service' : 'Add New Service'}
        </h2>
        <form onSubmit={handleSubmit} className='space-y-3'>
          <div className='flex items-center px-24'>
            <label htmlFor='name' className='font-semibold w-24 flex justify-end px-2 text-sm'>
              Name:
            </label>
            <input
              id='name'
              name='name'
              value={localService.name}
              onChange={handleChange}
              placeholder='Enter service name'
              required
              className='border p-1 rounded-md flex-1'
            />
          </div>
          <div className='flex items-center px-24'>
            <label
              htmlFor='description'
              className='font-semibold w-24 flex justify-end px-2 text-sm'
            >
              Description:
            </label>
            <textarea
              id='description'
              name='description'
              value={localService.description}
              onChange={handleChange}
              placeholder='Enter service description'
              required
              className='border p-1 rounded-md flex-1 h-14'
            />
          </div>
          <div className='flex items-center px-24'>
            <label htmlFor='price' className='font-semibold w-24 flex justify-end px-2 text-sm'>
              Price:
            </label>
            <input
              id='price'
              name='price'
              type='number'
              value={localService.price}
              onChange={handleChange}
              placeholder='Enter service price'
              min='0'
              step='0.1'
              required
              className='border p-1 rounded-md flex-1'
            />
          </div>
          <div className='flex justify-between mt-5'>
            <button
              type='submit'
              className='bg-black text-white px-4 py-1 rounded-md transition-opacity duration-200 hover:bg-opacity-75'
            >
              {service.id ? 'Update' : 'Add'} Service
            </button>
            <button
              type='button'
              onClick={onClose}
              className=' text-black px-4 py-1 rounded-md border transition-colors duration-200 hover:bg-gray-100'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ServiceDialog;
