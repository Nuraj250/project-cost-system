import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Layout from '../components/Layout';

interface Project {
    id: number;
    attributes: {
        title: string;
    };
}

export default function SimulatePage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectId, setProjectId] = useState<number | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [note, setNote] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data.data);
            } catch {
                alert('Failed to load projects');
            }
        };

        fetchProjects();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectId) return alert('Select a project first');
        setStatus('loading');

        try {
            await api.post('/payments', {
                data: {
                    amount,
                    note,
                    project: projectId,
                    paymentStatus: 'success',
                },
            });
            setStatus('success');
            setAmount(0);
            setNote('');
        } catch {
            setStatus('error');
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Simulate Payment</h1>

            <form onSubmit={handleSubmit} className="max-w-xl bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg space-y-6">
                <div>
                    <label className="block mb-1 font-semibold">Select Project</label>
                    <select
                        className="w-full bg-white/10 border border-white/20 p-3 rounded-lg text-white"
                        value={projectId ?? ''}
                        onChange={(e) => setProjectId(parseInt(e.target.value))}
                    >
                        <option value="" disabled>Select a project</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.attributes.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Amount</label>
                    <input
                        type="number"
                        className="w-full bg-white/10 border border-white/20 p-3 rounded-lg text-white"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Note (optional)</label>
                    <textarea
                        className="w-full bg-white/10 border border-white/20 p-3 rounded-lg text-white"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 py-3 px-6 rounded-lg font-semibold text-white"
                >
                    Simulate Payment
                </button>

                {status === 'success' && <p className="text-green-400 mt-2"> Payment simulated!</p>}
                {status === 'error' && <p className="text-red-400 mt-2"> Something went wrong.</p>}
            </form>
        </Layout>
    );
}
