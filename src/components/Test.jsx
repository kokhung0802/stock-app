import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";


const Test = () => {
    const fetchSession = async () => {
        const currentSession = await supabase.auth.getSession()
        console.log(currentSession)

    }

    useEffect(() => {
        fetchSession()
    }, []) 


    return (
        <div>
        </div>
    )

}

export default Test