import dynamic from 'next/dynamic';

const SyntaxHighlighter = dynamic(() =>
    import('react-syntax-highlighter').then((module) =>
        module.Prism
    )
);
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { useAPIResponse } from 'context/apiresp';

const LogDisplay = ({ logText }) => {
    const logTextNew = useAPIResponse();
    return (
        <div>
            <SyntaxHighlighter language="log" 
                style={tomorrow}
                codeTagProps={{style: {fontSize: "0.8em"} }}
                lineProps={{style: {wordBreak: "break-word", whiteSpace: "pre-wrap"}}}
                wrapLines={true}
                className="logviewer"
            >
                {logTextNew.apiResponse}
            </SyntaxHighlighter>
        </div>
    );
};

export default LogDisplay;
