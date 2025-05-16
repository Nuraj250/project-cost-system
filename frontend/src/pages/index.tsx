import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import Layout from '../components/Layout';

interface Project {
    id: number;
        title: string;
        hours: number;
}

export default function Home() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data.data);
            } catch (error) {
                alert('Failed to fetch projects.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">All Projects</h1>
            {loading ? (
                <p>Loading...</p>
            ) : projects.length === 0 ? (
                <p>No projects found. <a href="/add-project" className="underline">Add one?</a></p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            title={project.title}
                            hours={project.hours}
                        />
                    ))}
                </div>
            )}
        </Layout>
    );
}
