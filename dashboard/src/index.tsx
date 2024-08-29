import * as React from 'react';
import {createRoot} from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SubmitScanResults from "./components/SubmitScanResults";
import ListScanResults from "./components/ListScanResults";
import FindingsList from "./components/FindListScanResults";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SubmitScanResults/>} />
                <Route path="/results" element={<ListScanResults />} />
                <Route path="/results/:id/findings" element={<FindingsList resultId={parseInt(window.location.pathname.split('/').pop() || '')} />} />
            </Routes>
        </Router>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
} else {
    console.error('Root element not found');
}