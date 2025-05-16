'use client';

import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

interface TeamMember {
    id: number;
    attributes: {
        name: string;
        monthlySalary: number;
    };
}

const ProjectForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [hours, setHours] = useState<number>(0);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchTeam = async () => {
            const res = await api.get('/team-members');
            setTeamMembers(res.data.data);
        };
        fetchTeam();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/projects', {
                data: {
                    title,
                    hours,
                    team: selectedMembers,
                },
            });
            alert('Project created!');
            router.push('/');
        } catch (err) {
            alert('Error creating project');
        }
    };

    const toggleMember = (id: number) => {
        setSelectedMembers(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    return (
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Create New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-1">Project Title</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Estimated Hours</label>
                    <input
                        type="number"
                        className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
                        value={hours}
                        onChange={(e) => setHours(parseInt(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Select Team Members</label>
                    <div className="flex flex-wrap gap-2">
                        {teamMembers.map((member) => (
                            <button
                                type="button"
                                key={member.id}
                                className={`px-4 py-2 rounded-full border ${selectedMembers.includes(member.id)
                                        ? 'bg-blue-500 text-white border-blue-500'
                                        : 'bg-white/10 text-white border-white/20'
                                    }`}
                                onClick={() => toggleMember(member.id)}
                            >
                                {member.attributes.name}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
                >
                    Create Project
                </button>
            </form>
        </div>
    );
};

export default ProjectForm;
