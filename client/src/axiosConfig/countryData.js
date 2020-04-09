import { http } from './axiosConfig';

export default  {
    allCaseData: () => {
        return http.get('country-data/');
    }
};