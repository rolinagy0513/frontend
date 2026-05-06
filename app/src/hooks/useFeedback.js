import {useContext} from "react";

import apiServices from "../services/ApiServices.js";

import {CompanyPageContext} from "../context/company/CompanyPageContext.jsx";

export const useFeedback = () =>{

    const RESIDENT_FEEDBACK_API_PATH = import.meta.env.VITE_API_RESIDENT_FEEDBACK_URL;
    const COMPANY_FEEDBACK_API_PATH = import.meta.env.VITE_API_COMPANY_FEEDBACK_URL;

    const GIVE_FEEDBACK_URL = `${RESIDENT_FEEDBACK_API_PATH}/giveFeedback`
    const GET_FEEDBACK_URL = `${COMPANY_FEEDBACK_API_PATH}/getFeedbacksForCompany`

    const { setUsersFeedbacks } = useContext(CompanyPageContext);

    const sendFeedback = async (reportId,rating, message) =>{

        const data = {
            reportId : reportId,
            rating : rating,
            message : message,
        }

        try {
            // const response  = await apiServices.post("/api/resident/feedback/giveFeedback",data)
            const response  = await apiServices.post(`${GIVE_FEEDBACK_URL}`,data)
            console.log(response)
            alert("Thank you for your feedback!");
        }catch (error){
            alert(error.message)
        }

    }

    const getFeedbacksForCompany = async (companyId) =>{

        try {
            // const response = await apiServices.get(`api/company/feedback/getFeedbacksForCompany/${companyId}`)
            const response = await apiServices.get(`${GET_FEEDBACK_URL}/${companyId}`)
            setUsersFeedbacks(response)
        }catch (error){
            console.error(error.message);
        }

    }

    return {sendFeedback, getFeedbacksForCompany}

}