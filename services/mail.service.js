import nodemailer from 'nodemailer'
import {getTemplate} from "../template.js";

export const emailer = (zohoHours,clockifyHours) => {

    const transporter = nodemailer.createTransport({
        host: "in-v3.mailjet.com",
        port: 587,
        secure: false,
        auth: {
            user: "379ed38c1a0151afdaf0b68ed045a22f",
            pass: "8c4c386bb58c0858a7809f321998dd3b",
        },
    });
    transporter.verify((err, success) => {
        if (err) console.log('err: ', err)
        if (success) console.log('success: ', success)
    })
    const message = {
        from: "forginismtp@gmail.com",
        to: "mulic@gini-apps.com",
        subject: 'Gini-Apps time tracking notification',
        html: getTemplate(zohoHours,clockifyHours),
        attachments:[
            {
                filename:'image-1.png',
                path:'./images/image-1.png',
                cid:'zoho'
            },{
                filename:'image-2.png',
                path:'./images/image-2.png',
                cid:'clockify'
            },{
                filename:'image-3.png',
                path:'./images/image-3.png',
                cid:'gini'
            },
        ]

    };

    const cb = (err, info) => {
        if (err) console.log('err: ', err)
        console.log('info: ', info)
    }
    transporter.sendMail(message, cb)

}
