import React from 'react';
import ProjectForm from '../components/ProjectForm';
import Layout from '@/components/Layout';

export default function AddProjectPage() {
    return (
        <main className="p-4">
            <Layout>
                <ProjectForm />
            </Layout>        </main>
    );
}
