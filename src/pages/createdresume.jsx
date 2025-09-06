import React from "react";
import { useLocation } from "react-router-dom";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 text-red-700 rounded-lg">
          <h2 className="font-bold text-lg">Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function ResumeTemplate() {
  const location = useLocation();
  const { analysis } = location.state || {}; // safe destructuring

  console.log("Analysis Data:", analysis?.data?.resume);
  const data = analysis?.data?.resume;
  console.log(data);

  if (!data) return <p>No resume data found</p>;

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6">
        {/* Header */}
        <header className="border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.header?.name}
          </h1>
          {data?.header?.location && (
            <p className="text-gray-600">{data.header.location}</p>
          )}
          {data?.header?.contact && (
            <p className="text-gray-600">{data.header.contact}</p>
          )}
          {data?.links?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 text-blue-600 text-sm">
              {data.links.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {link}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Summary */}
        {data?.summary && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-1">
              Professional Summary
            </h2>
            <p className="mt-2 text-gray-700">{data.summary}</p>
          </section>
        )}

        {/* Skills */}
        {data?.skills && Object.keys(data.skills).length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-gray-700">
              {Object.entries(data.skills).map(([category, items], idx) => (
                <div key={idx}>
                  <h3 className="font-medium capitalize">
                    {category.replace("_", " ")}
                  </h3>
                  <ul className="list-disc ml-5">
                    {items.map((skill, i) => (
                      <li key={i}>
                        {typeof skill === "string"
                          ? skill
                          : JSON.stringify(skill)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data?.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-1">
              Experience
            </h2>
            <div className="mt-3 space-y-4">
              {data.experience.map((exp, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-600">
                    {exp.company} | {exp.duration}
                  </p>
                  {exp.achievements?.length > 0 && (
                    <ul className="list-disc ml-5 mt-2 text-gray-700">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx}>
                          {typeof ach === "string"
                            ? ach
                            : JSON.stringify(ach)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data?.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-1">
              Projects
            </h2>
            <div className="mt-3 space-y-4">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <h3 className="font-bold text-gray-900">{proj.title}</h3>
                  <p className="text-gray-700">{proj.description}</p>
                  {proj.techStack && proj.techStack.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Tech Stack:</span>{" "}
                      {proj.techStack.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data?.education && data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-1">
              Education
            </h2>
            <div className="mt-3 space-y-2">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-gray-600 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data?.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-1">
              Certifications
            </h2>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              {data.certifications.map((cert, i) => (
                <li key={i}>
                  {cert?.name || cert} {cert?.year && `- ${cert.year}`}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </ErrorBoundary>
  );
}
