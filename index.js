import {getClockifyData} from "./services/clockify.service.js";
import {getZohoData} from './services/zoho.service.js'
import {formatter} from './services/timeFormatter.service.js'
import {emailer} from './services/mail.service.js'

(async () => {
    setInterval(async () => {
        const zohoHours = await getZohoData();
        const clockifyHours = await getClockifyData();
        if (Math.abs(zohoHours - clockifyHours) > 5) emailer(formatter(zohoHours), formatter(clockifyHours))
    }, 60000)
})();

//fixed a series issue.