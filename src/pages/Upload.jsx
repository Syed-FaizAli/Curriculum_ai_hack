import React, { useState } from 'react';
import { Upload, Button, Form, Input, message } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';

const { Dragger } = Upload;

const UploadPage = () => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [programName, setProgramName] = useState('');

    const handleUpload = async () => {
        if (fileList.length === 0) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('program_name', programName || 'Untitled Analysis');

        fileList.forEach(file => {
            formData.append('syllabus_files', file);
        });

        try {
            const response = await fetch('http://127.0.0.1:8000/api/upload/', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                message.success('Analysis complete!');
                window.location.href = `/report/${data.analysis_id}`;
            } else {
                message.error('Analysis failed: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Failed to connect to backend.');
        } finally {
            setUploading(false);
        }
    };

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
        multiple: true,
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Navbar />
            <div className="pt-30 px-8 max-w-5xl mx-auto pb-10">
                <GlassCard>
                    <h1 className="text-3xl font-bold mb-20 text-center">New Curriculum Analysis</h1>

                    <Form layout="vertical">
                        <Form.Item label={<span className="text-[var(--text-secondary)]">Program Name</span>} required>
                            <Input
                                placeholder="e.g. B.S. Computer Science 2026"
                                className="bg-[var(--bg-input)] border-[var(--border-secondary)] text-[var(--text-primary)] h-12 text-lg"
                                value={programName}
                                onChange={(e) => setProgramName(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item label={<span className="text-[var(--text-secondary)]">Course Documents (Syllabi, Lecture Notes, Assignments)</span>}>
                            <Dragger {...props} className="bg-[var(--bg-input)] border-dashed border-[var(--border-secondary)] hover:border-indigo-500 rounded-xl" style={{ background: 'var(--bg-input)' }}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined className="text-indigo-500 text-5xl" />
                                </p>
                                <p className="ant-upload-text"><span className="text-[var(--text-secondary)]">Click or drag file to this area to upload</span></p>
                                <p className="ant-upload-hint">
                                    <span className="text-[var(--text-muted)]">Support for PDF, DOCX, and TXT files.</span>
                                </p>
                            </Dragger>
                        </Form.Item>

                        <Form.Item label={<span className="text-[var(--text-muted)]">Additional Context (Optional)</span>}>
                            <Upload>
                                <Button icon={<UploadOutlined />} className="bg-transparent border-2 border-[var(--text-muted)] text-[var(--text-primary)] hover:border-indigo-400 hover:text-indigo-400 transition-all">Upload Employer Feedback / Constraints</Button>
                            </Upload>
                        </Form.Item>

                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            className="w-full h-12 bg-indigo-600 border-none font-bold text-lg mt-4 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                        >
                            {uploading ? 'Analyzing (This may take a minute)...' : 'Start Analysis'}
                        </Button>
                    </Form>
                </GlassCard>
            </div>
        </div>
    );
};

export default UploadPage;
