import React from "react";

const Footer = () => {
    return (
        <footer className="w-full flex justify-center py-8 px-10 border-t border-[#f1f3f1] bg-white">
            <div className="w-full max-w-[1200px] flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-sm font-semibold text-[#131613]">AgroSense AI</span>
                    </div>
                    <div className="flex gap-6 text-xs font-normal text-gray-500">
                        <a className="hover:text-primary" href="#">Privacy Policy</a>
                        <a className="hover:text-primary" href="#">Terms of Service</a>
                        <a className="hover:text-primary" href="#">Contact</a>
                    </div>
                </div>
                <div className="border-t border-[#f1f3f1] w-full"></div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-gray-400 text-center md:text-left">
                    <p>© 2003 AgroSense AI. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">shield</span>
                        <span>Developed by Team Fourth X Born</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
