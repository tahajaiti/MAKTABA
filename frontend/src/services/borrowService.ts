import api from '../api/apiClient';
import Borrow from '../types/Borrow';
import Response from '../types/Response';


const getAll = () => api.get<Response<Borrow[]>>('/borrows');
const borrow = (id: number) => api.post<Response<Borrow>>(`/borrow/${id}`); //id for book
const returnBook = (id: number) => api.post<Response<Borrow>>(`/return/${id}`); //id for borrow

const borrowService = {
    getAll,
    borrow,
    returnBook
}
export default borrowService;
