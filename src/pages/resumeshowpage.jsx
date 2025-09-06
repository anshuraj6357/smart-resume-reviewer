import React from "react";
import { useLocation } from "react-router-dom";
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
  GraduationCap,
  FileText,
} from "lucide-react";

// helper: score colors
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
  const location = useLocation();
  const analysis = location.state?.analysis;
  console.log("Resume Data:", analysis);

  if (!analysis)
    return (
      <p className="p-4">No data to show. Please upload a resume first.</p>
    );

  return (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg">
      {/* Privacy Notice */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-start space-x-3">
        <Shield className="w-5 h-5 text-gray-600 mt-0.5" />
        <div>
          <h4 className="font-medium text-gray-900">Privacy & Security</h4>
          <p className="text-sm text-gray-600 mt-1">
            Your resume data is processed securely and not stored permanently.
          </p>
        </div>
    
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" /> Professional
          Summary
        </h3>
        <p className="text-gray-700">{analysis.summary}</p>
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Resume Analysis Complete
          </h2>
          <p className="text-gray-600 mt-1">
            Here's your detailed feedback and recommendations
          </p>
        </div>
        <div
          className={`text-right p-4 rounded-xl border-2 ${getScoreBackground(
            analysis.overallScore
          )}`}
        >
          <div
            className={`text-3xl font-bold ${getScoreColor(
              analysis.overallScore
            )}`}
          >
            {analysis.overallScore}%
          </div>
          <div className="text-sm text-gray-600">ATS Score</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Score Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Score Breakdown
          </h3>
          <div className="space-y-4">
            {Object.entries(analysis.scoreBreakdown).map(([area, score]) => (
              <div key={area}>
                <div className="flex justify-between">
                  <span className="capitalize">{area}</span>
                  <span className={`font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      score >= 80
                        ? "bg-green-500"
                        : score >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
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

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Weaknesses
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {analysis.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

  

      {/* Experience */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />
          Experience
        </h3>
        <p className="text-gray-700">
          Relevant Years: {analysis.experience.yearsRelevant}
        </p>
        {analysis.experience.roles.length === 0 ? (
          <p className="text-sm text-gray-500">No roles listed</p>
        ) : (
          <ul className="list-disc list-inside text-gray-700">
            {analysis.experience.roles.map((role, i) => (
              <li key={i}>{role}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-orange-600" />
          Certifications Needed
        </h3>
        {analysis.certifications.length === 0 ? (
          <p className="text-sm text-gray-500">No certifications</p>
        ) : (
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {analysis.certifications.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2 text-teal-600" />
          Skills
        </h3>
        <div>
          <p className="font-medium">Matched</p>
          {analysis.skills.matched.length === 0 ? (
            <p className="text-sm text-gray-500">No matched skills</p>
          ) : (
            <div className="flex flex-wrap gap-2 mt-1">
              {analysis.skills.matched.map((s, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="font-medium">Missing</p>
          {analysis.skills.missing.length === 0 ? (
            <p className="text-sm text-gray-500">No missing skills</p>
          ) : (
            <div className="flex flex-wrap gap-2 mt-1">
              {analysis.skills.missing.map((s, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          Suggestions
        </h3>
        <ul className="space-y-2">
          {analysis.suggestions.map((s, i) => (
            <li key={i} className="flex items-start">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-1 mr-2" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
