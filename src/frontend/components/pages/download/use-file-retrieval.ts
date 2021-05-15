import { TFile } from "@/shared/types/file";
import { useState } from "react";

export const useFileRetrieval = () => {

    const [loading, setLoading] = useState(false);
    const retrieveFile = async (uuid: string): Promise<TFile | null> => {
        setLoading(true);
        const response = await fetch(`/api/v1/file?uuid=${uuid}`);
        if (response.status !== 200) {
            alert(response.statusText);
            setLoading(false);
        } else {
            const file = await response.json();
            return file;
        }
        return null;
    }

    return { retrieveFile, loading };

}