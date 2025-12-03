export async function sendSupportMessage(formData) {
    try {
        const response = await fetch("http://localhost:3000/support", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        return await response.json();
        
    } catch (error) {
        console.error("Erreur API Support :", error);
        throw error;
    }
}
