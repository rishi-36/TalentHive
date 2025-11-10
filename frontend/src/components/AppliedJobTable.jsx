import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const jobs = Array.isArray(allAppliedJobs) ? allAppliedJobs : [];

    if (jobs.length === 0) {
        return <p className="text-center mt-4">You haven't applied to any job yet.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id}>
                            <TableCell>{appliedJob?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                            <TableCell>{appliedJob?.job?.title || "N/A"}</TableCell>
                            <TableCell>{appliedJob?.job?.company?.name || "N/A"}</TableCell>
                            <TableCell className="text-right">
                                <Badge
                                    className={`${
                                        appliedJob?.status === "rejected"
                                            ? 'bg-red-400'
                                            : appliedJob?.status === "pending"
                                            ? 'bg-gray-400'
                                            : 'bg-green-400'
                                    }`}
                                >
                                    {appliedJob?.status?.toUpperCase() || "N/A"}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
