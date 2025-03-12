function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 body-font">
            <div className="container px-5 py-6 mx-auto flex flex-col sm:flex-row items-center justify-between">
                {/* Logo & Branding */}
                <a className="flex items-center text-gray-900 text-lg font-bold">
                    <span>Phone Lab</span>
                </a>

                {/* Address & Contact */}
                <div className="text-center sm:text-left">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Phone Lab —
                        <a href="https://www.google.com/maps/search/?api=1&query=84+King+Street,+Kilmarnock+KA1+1PD"
                            className="text-blue-600 ml-1 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer">
                            84 King Street, Kilmarnock KA1 1PD
                        </a>
                    </p>
                    <p className="text-sm">
                        📞 <a href="tel:+441563404922" className="text-blue-600 hover:underline">+44 1563 404922</a>
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="flex mt-4 sm:mt-0 space-x-4">
                    <a href="https://www.facebook.com/share/1CFMA5tU4S/?mibextid=wwXIfr" target="_blank" className="text-gray-500 hover:text-gray-900">
                        <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/phonelabkilmarnock/" target="_blank" className="text-gray-500 hover:text-gray-900">
                        <svg fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                            <rect width="20" height="20" x="2" y="2" rx="5"></rect>
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                        </svg>
                    </a>
                    <a href="https://g.co/kgs/RJw91ZJ" target="_blank" className="text-gray-500 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M12 12h8.484c.107.522.166 1.056.166 1.6 0 4.8-3.2 8.4-8.8 8.4-5.2 0-9.6-4-9.6-9.6S6.4 2.8 11.6 2.8c2.4 0 4 .8 5.2 1.6L14 7.6c-.8-.4-1.6-.8-2.8-.8-3.2 0-5.6 2.4-5.6 5.6s2.4 5.6 5.6 5.6c2.8 0 4.8-1.6 5.2-4H12v-2.8z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;