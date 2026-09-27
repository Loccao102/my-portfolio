'use client';
import dynamic from 'next/dynamic';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { Lotus } from '../lotus';

const SenCanvas = dynamic(() => import('./sen-canvas'), { ssr: false, loading: () => <Lotus className="sen-fallback" /> });

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Lotus className="sen-fallback" /> : this.props.children; }
}

export function Sen() {
  const [mood, setMood] = useState('idle');
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  const [onScreen, setOnScreen] = useState(true);
  const container = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      query.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  return <button ref={container} className="sen-companion" aria-label="Chào Sen, người bạn đồng hành hình hoa sen" onMouseEnter={() => setMood('listening')} onMouseLeave={() => setMood('idle')} onFocus={() => setMood('listening')} onBlur={() => setMood('idle')} onClick={() => setMood(mood === 'success' ? 'idle' : 'success')}>
    <span className="sen-tooltip"><b>Sen</b>{mood === 'success' ? 'Chào một cái rồi quay lại build tiếp nhé.' : 'Ở đây thôi. Yên tĩnh, nhưng vẫn tò mò.'}</span>
    <span className="sen-model"><CanvasBoundary><SenCanvas mood={mood} reduced={reduced || !visible || !onScreen} /></CanvasBoundary></span>
    <span className="sen-caption"><i />SEN<span>WORKSHOP COMPANION</span></span>
  </button>;
}
