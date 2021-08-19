import moment from 'moment';
import axios from 'axios';
import zohoInfo from '../zohoConfig.js'

const {clientID, clientSecret, refreshToken, email} = zohoInfo

const getDay = (date) => {
    return date.slice(0, 2)
}

const getMonthAndYear = (date) => {
    return date.slice(2)
}

const singleDayReq = async (date, email, token) => {
    try {
        const res = await axios({
            method: 'post',
            url: `https://people.zoho.com/people/api/attendance/getAttendanceEntries?emailId=${email}&date=${date}&dateFormat=dd-MM-yyyy`,
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`
            }
        })
        // console.log('------------------res----------------------',res)
        return res
    } catch (err) {
        throw err
    }
}

const convertToMin = (hours) => {
    return moment.duration(hours).asMinutes()
}

const getNewToken = async (refreshToken, clientID, clientSecret) => {
    const url = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientID}&client_secret=${clientSecret}&grant_type=refresh_token`
    let res;
    try {
        res = await axios.post(url)
    } catch (err) {
        console.log('err from getNewToken', err)
    }
    const newToken = res.data.access_token;
    return newToken
}


const startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
const endOfMonth = moment().endOf('month').format('DD-MM-YYYY');
const endDay = getDay(endOfMonth)
const monthAndYear = getMonthAndYear(startOfMonth)
const date = new Date()
const today = date.getDate()

const singleDay = async (date, email, token) => {
    let res;
    try {
        res = await singleDayReq(date, email, token)
    } catch (err) {
        console.log('single day err: ', err)
    }
    const totalHrs = res.data.totalHrs;
    const totalInMin = convertToMin(totalHrs)
    return totalInMin
}

export const getZohoData = async () => {
    let totalMin = 0;
    const token = await getNewToken(refreshToken, clientID, clientSecret)
    for (let i = 1; i < endDay; i++) {
        if (i == (today + 1 || endDay + 1)) return totalMin
        const dailyTotal =await singleDay(i + monthAndYear, email, token)
        totalMin += dailyTotal
    }
    return totalMin
}
