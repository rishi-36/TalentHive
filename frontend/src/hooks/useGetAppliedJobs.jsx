import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                
                // Ensure field exists and is an array
                if (res.data.success && Array.isArray(res.data.applications)) {
                    dispatch(setAllAppliedJobs(res.data.applications));
                } else {
                    dispatch(setAllAppliedJobs([]));
                }
            } catch (error) {
                console.error("Failed to fetch applied jobs:", error);
                dispatch(setAllAppliedJobs([]));
            }
        };

        fetchAppliedJobs();
    }, [dispatch]);
};

export default useGetAppliedJobs;
