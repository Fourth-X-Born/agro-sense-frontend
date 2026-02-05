import React from "react";

const HowItWorks = () => {
    const steps = [
        {
            icon: "cloud_upload",
            title: "1. Tell Us What You Grow",
            description: "Choose your crop and district. No technical inputs. No guesswork."
        },
        {
            icon: "desktop_windows",
            title: "2. We Analyze the Weather",
            description: "Automatically checks live weather conditions and understands how they affect your crop."
        },
        {
            icon: "check_circle",
            title: "3. Get Smart Farming Advice",
            description: "See your crop's risk level and clear recommendations to protect your harvest."
        }
    ];

    return (
        <section className="w-full flex justify-center py-12 px-10 bg-gray-50" id="how-it-works">
            <div className="w-full max-w-[1200px] flex flex-col gap-8">
                <div className="text-left">
                    <h2 className="text-[#131613] text-xl font-bold leading-tight tracking-tight">How It Works</h2>
                    <p className="text-gray-500 text-sm mt-1">Get actionable farming advice in three simple steps.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-5 left-[20%] right-[20%] h-px bg-gray-200"></div>
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center gap-3 relative z-10">
                            <div className="h-10 w-10 rounded-full bg-white border border-primary flex items-center justify-center text-primary shadow-sm">
                                <span className="material-symbols-outlined text-lg">{step.icon}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-semibold text-sm">{step.title}</h4>
                                <p className="text-xs text-gray-500 max-w-[200px]">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
