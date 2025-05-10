import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config();

export const sydneyEvents = async(req,res)=>{
    try {
        const eveRes= await axios.get("https://app.ticketmaster.com/discovery/v2/events.json",{
            params: {
                apikey: process.env.TICKET_MASTER_KEY,
                city: 'Sydney',
                countryCode: 'AU',
                size: 20, // Number of events to retrieve
                sort: 'date,asc' // Sort events by date ascending
            }
        })
        const events = eveRes.data._embedded?.events;
        // console.log(events)
        if (events) {
            res.status(200).json({
                success:true,
                count:events.length,
                events,
            })
        } else {
            res.status(400).json({message:"No events found", success:false})
            console.log('No events found.');
        }
    } catch (error) {
        console.log("Error in fetching the events",error.message);
        res.status(500).json({message:"Internal Server Error",error: error.message})
    }
}