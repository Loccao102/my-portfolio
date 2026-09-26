import Link from 'next/link';
export default function NotFound() { return <main id="main" className="not-found"><span className="eyebrow" style={{ justifyContent: 'center' }}>404 / OFF THE WORKBENCH</span><h1>Nothing here.<br /><em>Not yet, anyway.</em></h1><p>This page isn’t part of the workshop.</p><Link className="button primary" href="/">Back to the workshop →</Link></main>; }
