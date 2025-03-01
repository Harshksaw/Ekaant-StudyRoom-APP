async function sendAdminVerificationEmail(adminEmail, libraryName) {
    try{
        const mailResponse = await mailSender(adminEmail,
             "Verification EMAIL from Ekaant Study Room",
             adminApprovalTemplate(adminEmail, libraryName));
        console.log("Email sent Successfully!! => ", mailResponse);
    } catch(error) {
        console.log("Error while sending email", error);
        throw error;
    }
}