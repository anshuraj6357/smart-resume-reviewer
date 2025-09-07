import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Shield,
    TrendingUp,
    Star,
    AlertCircle,
    Award,
    CheckCircle,
    BookOpen,
    Briefcase,
    Code,
    FileText,
} from "lucide-react";

// Helper: score colors
const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
};

const getScoreBackground = (score) => {
    if (score >= 80) return "border-green-500";
    if (score >= 60) return "border-yellow-500";
    return "border-red-500";
};


export function ResumeShowPage() {
    const navigate = useNavigate();

    const navigatinig = (e) => {
        e.preventDefault();
        navigate('/practisepage')

    }

    const location = useLocation();
    const analysis = location.state?.analysis;
    console.log("Resume Data:", analysis);

    if (!analysis)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="p-4 text-gray-600 bg-white rounded-xl shadow-md">
                    No data to show. Please upload a resume first.
                </p>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-6">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Shield/Privacy Notice Card */}
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl border border-gray-200 p-6 flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-white" />
                    <div>
                        <h4 className="text-lg font-bold text-white">Privacy Notice</h4>
                        <p className="text-white/80 mt-1 text-sm md:text-base">
                            Your resume information is safe and confidential.
                        </p>
                    </div>
                </div>

                {/* Privacy & Security + Interview Button Card */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 transition-all hover:shadow-3xl hover:scale-105">
                    <div className="flex-1">
                        <h4 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                            Privacy & Security
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-base leading-relaxed">
                            Your resume data is processed securely and not stored permanently. You can safely generate interview questions without worry.
                        </p>
                    </div>
                    <button
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl mt-4 md:mt-0"
                        onClick={navigatinig}
                    >
                        Interview Questions
                    </button>
                </div>


                {/* Professional Summary */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="w-6 h-6 mr-2 text-blue-600" />
                        Professional Summary
                    </h3>
                    <p className="text-gray-700">{analysis.summary}</p>
                </div>

                {/* Overall Score */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Resume Analysis Complete</h2>
                        <p className="text-gray-600 mt-1">
                            Here's your detailed feedback and recommendations
                        </p>
                    </div>
                    <div className={`text-right p-4 rounded-xl border-2 ${getScoreBackground(analysis.overallScore)}`}>
                        <div className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                            ATS Score: {analysis.atsScore}%
                        </div>

                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Score Breakdown */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                            Score Breakdown
                        </h3>
                        <div className="space-y-4">
                            {Object.entries(analysis.scoreBreakdown).map(([area, score]) => (
                                <div key={area}>
                                    <div className="flex justify-between text-gray-700 font-medium capitalize">
                                        <span>{area}</span>
                                        <span className={getScoreColor(score)}>{score}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                        <div
                                            className={`h-2 rounded-full ${score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                                            style={{ width: `${score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <Award className="w-5 h-5 mr-2 text-green-600" />
                                Strengths
                            </h3>
                            <ul className="space-y-2">
                                {analysis.strengths.map((s, i) => (
                                    <li key={i} className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Weaknesses</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {analysis.weaknesses.map((w, i) => (
                                    <li key={i}>{w}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Experience */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />
                        Experience
                    </h3>
                    <p className="text-gray-700">Relevant Years: {analysis.experience.yearsRelevant}</p>
                    {analysis.experience.roles.length === 0 ? (
                        <p className="text-sm text-gray-500">No roles listed</p>
                    ) : (
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                            {analysis.experience.roles.map((role, i) => (
                                <li key={i}>
                                    <p className="font-medium">{role.title} @ {role.company}</p>
                                    <p className="text-sm text-gray-500">{role.dates}</p>
                                    {role.evidence && role.evidence.map((e, j) => (
                                        <p key={j} className="text-sm text-gray-600">- {e}</p>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Certifications */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-orange-600" />
                        Certifications
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="font-medium text-gray-800">Present</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {analysis.certifications.present.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="font-medium text-gray-800">Recommended</p>
                            {analysis.certifications.recommended.length === 0 ? (
                                <p className="text-sm text-gray-500">No recommendations</p>
                            ) : (
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    {analysis.certifications.recommended.map((c, i) => (
                                        <li key={i}>{c}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Code className="w-5 h-5 mr-2 text-teal-600" />
                        Skills
                    </h3>

                    <div>
                        <p className="font-medium">Matched</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {analysis.skills.matched.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="font-medium">Missing</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {analysis.skills.missing.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-500" />
                        Suggestions
                    </h3>
                    <ul className="space-y-3">
                        {analysis.suggestions.map((s, i) => (
                            <li key={i} className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                                <p className="font-medium text-gray-800">
                                    Priority {s.priority}: {s.action}
                                </p>
                                <p className="text-sm text-gray-600">{s.detail}</p>
                                <p className="text-xs text-gray-500 mt-1">ETA: {s.etaWeeks} weeks</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}
