import apiServices from "../services/ApiServices.js";

export const usePDF = () => {

    const RESIDENT_PDF_URL = import.meta.env.VITE_API_RESIDENT_PDF_URL;

    const DOWNLOAD_URL = `${RESIDENT_PDF_URL}/download`

    const generateInvoicePdf = async (invoiceData) => {
        try {
            // const response = await apiServices.post('/api/resident/pdf/download', invoiceData);
            const response = await apiServices.post(`${DOWNLOAD_URL}`,invoiceData);
            return response;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
    };

    const downloadPDF = async (invoiceData) => {
        try {

            // const response = await fetch('/api/resident/pdf/download', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(invoiceData),
            //     credentials: 'include'
            // });

            const response = await fetch(`${DOWNLOAD_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice_${invoiceData.invoiceNumber}.pdf`;
            document.body.appendChild(a);
            a.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            return true;
        } catch (error) {
            console.error('Error downloading PDF:', error);
            throw error;
        }
    };

    return {
        generateInvoicePdf,
        downloadPDF
    };
};