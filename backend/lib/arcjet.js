import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import dotenv from "dotenv"

dotenv.config()

// initialize arcjet

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        // shield protects app from common attacks (sql injection, XSS, CSRF attacks)
        shield({mode:"LIVE"}),
        detectBot({
            // block all bots except search engines
            mode:"LIVE",
            // view full list at arcjet.com/bot-list
            allow:[
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        // rate limiting | 10 tokens/10 sec interval/5 tokens refill after 10 sec interval/20 sec for 10 tokens(capacity)
        tokenBucket({
            mode: "LIVE",
            refillRate: 30,
            interval: 5,
            capacity: 20
        })
    ]
})