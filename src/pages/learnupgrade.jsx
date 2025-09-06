import React, { useState } from "react";

export function SkillsPage() {
    const [skill, setSkill] = useState("");
    const [skillsList, setSkillsList] = useState([]);

    const handleAddSkill = () => {

    };

    const handleRemoveSkill = (removeSkill) => {
        setSkillsList(skillsList.filter((s) => s !== removeSkill));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
                    Add  Skills  u waana learn
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Enter your skills below and see the live preview
                </p>

                {/* Skill Input */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                    <input
                        type="text"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        placeholder="Enter a skill"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <button
                        onClick={handleAddSkill}
                        className="px-5 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    >
                        Search
                    </button>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {skillsList.map((s, idx) => (
                        <span
                            key={idx}
                            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {s}
                            <button
                                onClick={() => handleRemoveSkill(s)}
                                className="text-red-500 font-bold hover:text-red-700"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>

                {/* Iframe */}
                <div className="w-full h-64 sm:h-96 border rounded-lg overflow-hidden shadow-md">
                    <a href="https://www.youtube.com/watch?v=dGcsHMXbSOA" target="_blank">
                        Watch React.js Full Course
                    </a>


                </div>
            </div>
        </div>
    );
}
