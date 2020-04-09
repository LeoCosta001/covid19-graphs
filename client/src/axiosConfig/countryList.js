import { http } from './axiosConfig';

export default  {
    toList: () => {
        return http.get('country-list/');
    }
};