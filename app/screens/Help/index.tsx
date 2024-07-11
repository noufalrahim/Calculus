export default function Help() {

    const termsAndConditions = [
        'This is a test version of the software',
        'Any data entered here will be deleted after the test period',
        'Please do not enter any sensitive data',
        'Please do not share any sensitive data',
        'Datas entered here will be used for testing purposes only',
        'Please do not use this software for any commercial purposes',
        'Report any bugs to the developer',
        'Please do not share this software with anyone',
        'Please do not use this software for any illegal purposes',
        'Please do not use this software for any unethical purposes',
        'Calculus is not responsible for any data loss or damage caused by the use of this software',
        'You are a tester of this software and your feedback is valuable to us',
    ]

    const contactUs = [
        {
            label: 'Email Us',
            contact: 'noufalrahim6784@gmail.com',
            value: 'mailto:noufalrahim6784@gmail.com'
        },
        {
            label: 'Call Us',
            contact: '+91 9778025976',
            value: 'tel:+919778025976'
        },
    ]

    return (
        <div style={{
            width: '94%',
            marginLeft: '3%',
            marginTop: '3%',
        }}>
            <div>
                <h4 className="">Terms & Conditions</h4>
                <ul className="list-group">
                    {termsAndConditions.map((term, index) => (
                        <div className="flex flex-row gap-2">
                            <p>
                                {"(" + (index + 1) + ") "}
                            </p>
                            <li key={index}>{term}</li>
                        </div>
                    ))}
                </ul>
                <p className="mt-2 font-bold">
                    By using this software, you agree to the above terms and conditions.
                </p>
            </div>
            <div className="mt-4">
                <h4 className="">Help & Support</h4>
                <div>
                    <p>For any queries, suggestions or feedback, please contact us at </p>
                    <div className="flex flex-col">
                        {
                            contactUs.map((contact, index) => (
                                <div key={index} className="" style={{
                                    marginTop: '1rem'
                                }}>
                                    <a href={contact.value}>
                                        <button className="btn btn-primary">
                                            {contact.label}: {contact.contact}
                                        </button>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}