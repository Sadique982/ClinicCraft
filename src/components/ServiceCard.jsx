import { Trash2, Pencil } from 'lucide-react';
const ServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className='border rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow duration-200 text-start'>
      <h3 className='text-xl font-semibold'>{service.name}</h3>
      <p className='text-md my-4 opacity-50'>{service.description}</p>
      <h3 className='text-xl font-bold text-green-600'>${service.price.toFixed(2)}</h3>
      <div className='flex justify-end space-x-5'>
        <button
          className='flex items-center border px-5 py-1 rounded-md text-black transition-colors duration-200 hover:bg-gray-100'
          onClick={() => onEdit(service)}
        >
          <Pencil size={15} className='mr-1' />
          Edit
        </button>
        <button
          className='flex mx-auto items-center bg-red-500 text-white px-3 rounded-md transition-colors duration-200 hover:bg-red-600'
          onClick={() => onDelete(service.id)}
        >
          <Trash2 size={15} className='mr-1' />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
