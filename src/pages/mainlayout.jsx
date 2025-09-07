


// src/pages/mainlayout.jsx
import React from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export function LandingPaging() {
    const { user, isAuthenticated } = useSelector((store) => store.auth);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Accessible skip link */}
            <a
                href="#main"
                className="fixed left-3 top-3 z-50 -translate-y-24 focus:translate-y-0 rounded-md bg-slate-900 px-3 py-2 text-white shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
                Skip to content
            </a>

            <main id="main">
                {/* Hero */}
                <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1020] to-[#101735]">
                    {/* Decorative readable overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(7,12,32,0.45)_0%,rgba(7,12,32,0.8)_100%)]" />
                    {/* Optional animated glow layers gated by motion preferences */}
                    <div className="pointer-events-none absolute inset-0 opacity-40 blur-3xl motion-safe:animate-pulse">
                        <div className="absolute -top-1/3 left-0 h-[40vh] w-[40vw] rounded-full bg-cyan-500/20" />
                        <div className="absolute top-1/4 -right-1/3 h-[35vh] w-[35vw] rounded-full bg-indigo-500/20" />
                    </div>

                    <div className="relative mx-auto w-[min(1120px,92%)] py-16">
                        <h1 className="mb-3 max-w-3xl text-balance text-3xl leading-tight text-white md:text-5xl">
                            Smarter resumes with AI   score, gaps, and actionable fixes
                        </h1>
                        <p className="mb-6 max-w-2xl text-slate-300">
                            Upload a resume and get an instant score, missing skill insights, and tailored improvement suggestions powered by AI.
                        </p>
                        <div className="flex flex-wrap gap-3">

                            {isAuthenticated ? (
                                <Link
                                    to="/resumeupload"
                                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-3 text-base font-semibold text-slate-900 shadow transition will-change-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                                >
                                    Upload Resume
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-3 text-base font-semibold text-slate-900 shadow transition will-change-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                                >
                                    Upload Resume
                                </Link>
                            )}

                            <a
                                href="#how"
                                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-base font-semibold text-white/90 transition hover:bg-white/10 motion-reduce:transition-none"
                            >
                                How it works
                            </a>
                        </div>
                    </div>
                </section>

                {/* About */}
                <section id="about" className="bg-[#101735] py-12">
                    <div className="mx-auto w-[min(1120px,92%)]">
                        <h2 className="mb-2 text-2xl font-semibold text-white">About SmartResume.AI</h2>
                        <p className="max-w-3xl text-slate-300">
                            SmartResume.AI evaluates structure, impact, and relevance using modern scoring heuristics, then highlights missing skills recruiters expect for a target role.
                        </p>
                        <p className="mt-2 max-w-3xl text-slate-300">
                            The result is a concise score with prioritized, actionable edits—saving time while increasing interview‑readiness.
                        </p>
                    </div>
                </section>

                {/* How it works */}
                <section id="how" className="bg-[#0f1631] py-12">
                    <div className="mx-auto w-[min(1120px,92%)]">
                        <h2 className="mb-5 text-2xl font-semibold text-white">How it works</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            <article className="rounded-xl border border-white/10 bg-gradient-to-b from-[#141c3a] to-[#1a2454] p-5 text-white shadow">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-cyan-400/15 text-cyan-300">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M21 21V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h3 className="mt-2 font-semibold">Login</h3>
                                <p className="text-slate-300">Create or sign in to an account to sync results and track improvements over time.</p>
                            </article>

                            <article className="rounded-xl border border-white/10 bg-gradient-to-b from-[#141c3a] to-[#1a2454] p-5 text-white shadow">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-cyan-400/15 text-cyan-300">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 16V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M8 8l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20 16v4H4v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h3 className="mt-2 font-semibold">Upload CV</h3>
                                <p className="text-slate-300">Drop a PDF or DOCX and set a target role to tailor analysis and skill checks.</p>
                            </article>

                            <article className="rounded-xl border border-white/10 bg-gradient-to-b from-[#141c3a] to-[#1a2454] p-5 text-white shadow">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-cyan-400/15 text-cyan-300">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M12 12l4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h3 className="mt-2 font-semibold">Score & Improve</h3>
                                <p className="text-slate-300">See your score, missing skills, and prioritized edits—then iterate fast with guidance.</p>
                            </article>
                        </div>
                    </div>
                </section>
            </main>
        </motion.div>
    );
}