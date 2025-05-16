import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import Layout from '../../components/Layout';

interface CostSummary {
    project: string;
    hours: number;
    staff_cost: number;
    office_cost: number;
    total_cost: number;
    cost_per_hour: number;
}

export default function SummaryPage() {
    const router = useRouter();
    const { id } = router.query;
    const [summary, setSummary] = useState<CostSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchSummary = async () => {
            try {
                const res = await api.get(`/projects/${id}/cost`);
                setSummary(res.data);
            } catch (error) {
                alert('Failed to fetch cost summary.');
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [id]);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Project Cost Summary</h1>

            {loading ? (
                <p>Loading...</p>
            ) : summary ? (
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl max-w-xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4">{summary.project}</h2>
                    <ul className="space-y-2">
                        <li className="flex justify-between">
                            <span>Estimated Hours:</span>
                            <span>{summary.hours}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Staff Cost:</span>
                            <span>${summary.staff_cost.toFixed(2)}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Office Cost:</span>
                            <span>${summary.office_cost.toFixed(2)}</span>
                        </li>
                        <li className="flex justify-between font-bold">
                            <span>Total Cost:</span>
                            <span>${summary.total_cost.toFixed(2)}</span>
                        </li>
                        <li className="flex justify-between text-blue-400">
                            <span>Cost per Hour:</span>
                            <span>${summary.cost_per_hour.toFixed(2)}</span>
                        </li>
                    </ul>
                </div>
            ) : (
                <p className="text-red-400">No summary available.</p>
            )}
        </Layout>
    );
}
