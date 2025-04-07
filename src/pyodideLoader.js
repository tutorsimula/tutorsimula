// pyodideLoader.js
import { loadPyodide } from 'pyodide';

export const initializePyodide = async () => {
  console.log('Starting to load Pyodide...');
  try {
    const pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.4/full/', // Updated to v0.27.4
    });
    console.log('Pyodide loaded successfully.');
    return pyodide;
  } catch (error) {
    console.error('Error loading Pyodide:', error);
    throw error;
  }
};