import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

import { useAPIResponse } from 'context/apiresp';


function createLogString(jsonArray) {
    let logString = '';
    jsonArray.forEach((obj) => {
        const { level, msg } = obj;
        logString += `${level}: ${msg}\n`;
    });
    return logString;
}

const YAMLEditor = () => {
    const [yamlCode, setYamlCode] = useState('');
    const apiResponseContext = useAPIResponse();

    const handlePaste = () => {
        setTimeout(handleSubmit, 500);
    }
    /**
     * Handles the submission of the YAML code.
     */
    const handleSubmit = () => {
        // Handle the submission of the YAML code
        apiResponseContext.setAPIResponse('Validating... Please wait...');

        fetch('/api/v1/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-yaml'
            },
            body: yamlCode
        })
        .then(response => response.json())
        .then(data => {
            apiResponseContext.setAPIResponse(createLogString(data));
        })
        .catch(error => {
            apiResponseContext.setAPIResponse('Error occurred: ' + error.toString());
        });
    };

    return (
        <div>
            <AceEditor
                mode="yaml"
                theme="monokai"
                value={yamlCode}
                onChange={setYamlCode}
                name="yaml-editor"
                editorProps={{ $blockScrolling: true }}
                style={{ width: '100%', height: '600px' }}
                onPaste={handlePaste}
                onLoad={(editor) => {
                    editor.focus();
                }}
            />
            <button className="btn btn-primary btn-right rounded text-sm mt-2" onClick={handleSubmit}>Validate</button>
        </div>
    );
};



export default YAMLEditor;
