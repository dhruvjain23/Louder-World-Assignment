import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:"https://louder-world-assignment.vercel.app/api" || "http://localhost:3000/api",
    withCredentials:true
})

export const getEvents = async(req,res)=>{
    try {
        const eventsResponse= await axiosInstance.get('/sydney-event')
        // console.log(eventsResponse)
        return eventsResponse.data.events;
    } catch (error) {
        console.log("Error in fetching the data from backend", error.message)
        return [];
    }
}