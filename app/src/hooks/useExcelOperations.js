import apiServices from "../services/ApiServices.js";

export const useExcelOperations = () =>{

    const ADMIN_EXCEL_API_PATH = import.meta.env.VITE_API_ADMIN_EXCEL_URL

    const TEMPLATE_URL = `${ADMIN_EXCEL_API_PATH}/templateDownload`
    const USERS_URL = `${ADMIN_EXCEL_API_PATH}/users`

    const getExcelTemplate = async () => {
        try {
            // const blob = await apiServices.download("/api/admin/bulk-upload/templateDownload");
            const blob = await apiServices.download(`${TEMPLATE_URL}`)

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;

            let fileName = 'user_upload_template.xlsx';

            link.setAttribute('download', fileName);

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);

            return { success: true, fileName };

        } catch (error) {
            console.error('Error downloading Excel template:', error);
            return {
                success: false,
                error: error.message || 'Failed to download template'
            };
        }
    };

    const uploadExcelFile = async (file) =>{

        try {
            const formData = new FormData();
            formData.append('file', file);

            // const response = await fetch('/api/admin/bulk-upload/users', {
            //     method: 'POST',
            //     body: formData,
            //     credentials: 'include'
            // });

            const response = await fetch(`${USERS_URL}`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.errors?.[0]?.errorMessage || 'Upload failed');
            }

            const data = await response.json();
            return { success: true, data };

        } catch (error) {
            console.error('Error uploading Excel file:', error);
            return {
                success: false,
                error: { errors: [{ errorMessage: error.message || 'Upload failed' }] }
            };
        }
    }

    return({getExcelTemplate,uploadExcelFile})
}