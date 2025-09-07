// ResumeUpload.jsx
import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Upload, Target, Zap, Shield, CheckCircle } from 'lucide-react';
import { useUploadResumeMutation, useGenerateResumeMutation } from '../features/api/resumeapi';
import { useNavigate } from 'react-router-dom';

export function ResumeUpload() {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const [uploadResume, { isLoading }] = useUploadResumeMutation();
  const [generateResume, { isLoading: generateloading }] = useGenerateResumeMutation();

  const handleFileUpload = (file) => {
    if (file.type === 'application/pdf' || file.type === 'text/plain') {
      setResumeFile(file);
      setResumeText('');
    } else {
      toast.error('Only PDF or text files are supported.');
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setDragOver(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobRole || (!resumeText && !resumeFile)) {
      toast.error('Please provide a job role and resume.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('jobRole', jobRole);
      formData.append('jobDescription', jobDescription);
      if (resumeText) formData.append('resumeText', resumeText);
      if (resumeFile) formData.append('resumeFile', resumeFile);

      const result = await uploadResume(formData).unwrap();

      if (result.success) {
        navigate('/resumeshowpage', { state: { analysis: result.analysis } });
        toast.success('Resume uploaded successfully!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload resume!');
    }
  };

  const handleGenerateAI = async (e) => {
    e.preventDefault();
    if (!jobRole || (!resumeText && !resumeFile)) {
      toast.error('Please provide a job role and resume.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('jobRole', jobRole);
      formData.append('jobDescription', jobDescription);
      if (resumeText) formData.append('resumeText', resumeText);
      if (resumeFile) formData.append('resumeFile', resumeFile);

      const dataResult = await generateResume(formData);
      if (dataResult) {
        navigate('/resumetemplate', { state: { analysis: dataResult } });
      }
    } catch (error) {
      console.error(error);
      toast.error('AI generation failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid lg:grid-cols-2 gap-10">

          {/* Resume Upload Card */}
          <div className="space-y-6">
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden hover:shadow-3xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-10 pointer-events-none"></div>
              <div className="p-8 space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Upload Your Resume</h2>
                </div>

                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {resumeFile ? (
                    <div className="flex items-center justify-center space-x-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <p className="text-gray-800 font-medium">{resumeFile.name}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">Drop your resume here or <span className="text-blue-600 underline">browse</span></p>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  />
                </div>

                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Or paste your resume..."
                  rows={6}
                  className="w-full mt-4 p-4 border rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Job Info Card */}
          <div className="space-y-6">
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden hover:shadow-3xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-10 pointer-events-none"></div>
              <div className="p-8 space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Target Job Role</h2>
                </div>

                <input
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="Job Title *"
                  className="w-full px-4 py-3 border rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                />

                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Job Description (Optional)"
                  rows={4}
                  className="w-full px-4 py-3 mt-4 border rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                />

                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  {/* Analyze Resume Button */}
                  <button
                    type="submit"
                    disabled={(!resumeText && !resumeFile) || !jobRole || isLoading || generateloading} // ✅ disabled if either is loading
                    className={`flex-1 py-3 rounded-2xl text-white font-medium flex items-center justify-center space-x-2 transition duration-200
      ${(!resumeText && !resumeFile) || !jobRole || isLoading || generateloading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <span>Uploading...</span>
                        <Zap className="w-5 h-5 animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Analyze Resume</span>
                        <Zap className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Generate with AI Button */}
                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={(!resumeText && !resumeFile) || !jobRole || generateloading || isLoading} // ✅ disabled if either is loading
                    className={`flex-1 py-3 rounded-2xl text-white font-medium flex items-center justify-center space-x-2 transition duration-200
      ${(!resumeText && !resumeFile) || !jobRole || generateloading || isLoading
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                      }`}
                  >
                    {generateloading ? (
                      <>
                        <span>Generating...</span>
                        <Zap className="w-5 h-5 animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Enhance with AI</span>
                        <Zap className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>

            {/* Security Info */}
            <div className="bg-gray-50 p-5 rounded-2xl flex items-start space-x-3 shadow-sm border border-gray-200">
              <Shield className="w-5 h-5 mt-0.5 text-gray-600" />
              <p className="text-gray-600 font-medium">
                Your data is processed securely and not stored permanently.
              </p>
            </div>
          </div>

        </form>
      </main>
    </div>

  );
}
