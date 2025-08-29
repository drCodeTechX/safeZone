#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
if (!apiUrl) {
    console.error('EXPO_PUBLIC_API_URL environment variable is required');
    process.exit(1);
}

const url = new URL(apiUrl);
const host = url.hostname;
const port = url.port || '3000';

const dbPath = path.resolve(__dirname, '../db.json');
const args = ['json-server', dbPath, '--host', host,'--port', port];

const child = spawn('npx', args, { stdio: 'inherit', shell: true });

child.on('close', code => process.exit(code));