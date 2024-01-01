import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

import { useAPIResponse } from 'context/apiresp';


function createLogString(jsonArray) {
    let logString = '';
    if (jsonArray !== null && jsonArray.length > 0) {
        jsonArray.forEach((obj) => {
            const { level, msg } = obj;
            logString += `${level}: ${msg}\n`;
        });
    }
    if (logString === '') {
        logString = 'Sorry, could not validate the manifest file! Try another...';
    }
    return logString;
}

const YAMLEditor = () => {
    const [yamlCode, setYamlCode] = useState('');
    const apiResponseContext = useAPIResponse();

    const handlePaste = (pastedText) => {
        if ((yamlCode === '') && (pastedText !== '')) {
            handleSubmit(pastedText);
        }
    }
    /**
     * Handles the submission of the YAML code.
     */
    const handleSubmit = (pastedYaml) => {
        // Handle the submission of the YAML code
        var yaml = yamlCode;
        apiResponseContext.setAPIResponse('Validating... Please wait...');
        if (typeof pastedYaml === 'string' || pastedYaml instanceof String) {
            yaml = pastedYaml;
        }

        fetch('/api/v1/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-yaml'
            },
            body: yaml
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
