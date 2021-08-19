import moment from 'moment';
import axios from 'axios';

export const getClockifyData = async() => {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
    const response = await axios.get(`https://api.clockify.me/api/v1/workspaces/5c365635b0798731dc470ad4/user/5fc5f66c0833682c273d8034/time-entries?page-size=500&start=${startOfMonth}T00:00:00.998Z&end=${endOfMonth}T23:59:59.998Z`, {
        headers: {'X-Api-Key': 'X9hhdtJpw2+gT2WA'}
    });
    const serializeDurations = async(durations) => {
        let sumInMinutes = 0;
        durations.forEach(record => {
            const { timeInterval: { start, end } } = record;
            if(end == null) return;
            const diffInMinutes = moment(end).diff(moment(start), 'minutes');
            sumInMinutes += diffInMinutes;
        })
        return sumInMinutes
    }
    return await serializeDurations(response.data);
}