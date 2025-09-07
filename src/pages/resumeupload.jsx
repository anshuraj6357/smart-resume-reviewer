// ResumeUpload.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Upload, Target, Zap, Shield, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { useUploadResumeMutation, useGenerateResumeMutation } from '../features/api/resumeapi';
import { useNavigate } from 'react-router-dom'
export function ResumeUpload() {
  const navigate = useNavigate()
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const [uploadResume, { data, isLoading, isSuccess }] = useUploadResumeMutation();
  const [GenerateResume, { isLoading: generateloading }] = useGenerateResumeMutation();
  const handleFileUpload = (file) => {
    if (file.type === 'application/pdf' || file.type === 'text/plain') {
      setResumeFile(file);
      setResumeText('');
    } else {
      alert('Only PDF or text files are supported.');
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
      alert('Please provide a job role and resume.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('jobRole', jobRole);
      formData.append('jobDescription', jobDescription);
      if (resumeText) formData.append('resumeText', resumeText);
      if (resumeFile) formData.append('resumeFile', resumeFile);


      const result = await uploadResume(formData).unwrap();
      console.log(result?.analysis)

      if (result.success) {
        navigate('/resumeshowpage', { state: { analysis: result?.analysis } });

      }

      alert('Resume uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload resume!');
    }
  };





  const handleGenerateAI = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('jobRole', jobRole);
      formData.append('jobDescription', jobDescription);
      if (resumeText) formData.append('resumeText', resumeText);
      if (resumeFile) formData.append('resumeFile', resumeFile);
      const dataresult = await GenerateResume(formData)
      console.log(dataresult)
      if (dataresult) {
        navigate('/resumetemplate', { state: { analysis: dataresult } });

      }


    } catch (error) {
      console.log(error)

    }

  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid lg:grid-cols-2 gap-8">

          {/* Resume Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><Upload className="w-5 h-5 text-blue-600" /></div>
                <h2 className="text-xl font-semibold">Upload Your Resume</h2>
              </div>

              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {resumeFile ? (
                  <div className="flex items-center justify-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <p>{resumeFile.name}</p>
                  </div>
                ) : (
                  <>
                    <p>Drop your resume here or <button type="button" onClick={() => fileInputRef.current?.click()} className="text-blue-600 underline">browse</button></p>
                  </>
                )}
                <input ref={fileInputRef} type="file" accept=".pdf,.txt" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} className="hidden" />
              </div>

              <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Or paste your resume..." rows={6} className="w-full mt-4 p-3 border rounded-lg" />
            </div>
          </div>

          {/* Job Info Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-purple-600" /></div>
                <h2 className="text-xl font-semibold">Target Job Role</h2>
              </div>

              <input type="text" value={jobRole} onChange={(e) => setJobRole(e.target.value)} placeholder="Job Title *" className="w-full px-4 py-3 border rounded-lg" />
              <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Job Description (Optional)" rows={4} className="w-full px-4 py-3 mt-4 border rounded-lg" />

              <div className="flex flex-col md:flex-row gap-4 mt-6">
                {/* Analyze Resume Button */}
                <button
                  type="submit"
                  disabled={(!resumeText && !resumeFile) || !jobRole || isLoading}
                  className={`flex-1 py-3 rounded-lg bg-blue-600 text-white font-medium
      hover:bg-blue-700 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed
      flex items-center justify-center space-x-2`}
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
                  onClick={handleGenerateAI} // Add your function here
                  className="flex-1 py-3 rounded-lg bg-green-600 text-white font-medium
      hover:bg-green-700 transition duration-200 flex items-center justify-center space-x-2"
                >
                  {generateloading ? (<>
                    <span>Generating...</span>
                    <Zap className="w-5 h-5 animate-spin" />
                  </>
                  ) : (
                    <>
                      <span> Generate with Ai</span>
                      <Zap className="w-5 h-5" />
                    </>
                  )}

                 
                </button>
              </div>

            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-start space-x-3">
              <Shield className="w-5 h-5 mt-0.5 text-gray-600" />
              <p className="text-gray-600">Your data is processed securely and not stored permanently.</p>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
}
