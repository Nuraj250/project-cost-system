import React from 'react';
import Link from 'next/link';

interface ProjectCardProps {
    id: number;
    title: string;
    hours: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, hours }) => {
    return (
        <Link href={`/summary/${id}`}>
            <div className="p-4 bg-white/10 hover:bg-white/20 rounded-xl shadow-md transition-all cursor-pointer">
                <h2 className="text-lg font-semibold mb-1">{title}</h2>
                <p className="text-sm text-gray-300">Estimated Hours: {hours}</p>
            </div>
        </Link>
    );
};

export default ProjectCard;
