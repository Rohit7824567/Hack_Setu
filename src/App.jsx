import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BenchmarkChips from './components/BenchmarkChips';
import MessageScanner from './components/MessageScanner';
import RiskGauge from './components/RiskGauge';
import HighlightingEngine from './components/HighlightingEngine';
import ScoringBreakdown from './components/ScoringBreakdown';
import EmergencyActionHub from './components/EmergencyActionHub';
import FalsePositiveShowcase from './components/FalsePositiveShowcase';
import BankDirectoryModal from './components/BankDirectoryModal';
import IncidentReportModal from './components/IncidentReportModal';
import ThreatIntelligenceLiveFeed from './components/ThreatIntelligenceLiveFeed';
import MonetizationModal from './components/MonetizationModal';
import ArchitectureModal from './components/ArchitectureModal';
import Footer from './components/Footer';

import { analyzeMessage, checkServerHealth } from './utils/api';
import { BENCHMARKS_DATA } from './engine/benchmarksData';

export default function App() {
  // Pre-load with Official SBI KYC Scam benchmark from Slide 6
  const defaultBenchmark = BENCHMARKS_DATA[0];
  const [inputText, setInputText] = useState(defaultBenchmark.message);
  const [senderHeader, setSenderHeader] = useState(defaultBenchmark.sender);
  const [activeBenchmarkId, setActiveBenchmarkId] = useState(defaultBenchmark.id);

  // Analysis result state
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'banks' | 'threats' | 'falsePositive' | 'monetization' | 'architecture' | 'report'

  // Run initial analysis and server check
  useEffect(() => {
    checkServerHealth().then(status => setBackendStatus(status));
    executeAnalysis(defaultBenchmark.message, defaultBenchmark.sender);
  }, []);

  const executeAnalysis = async (text, sender = '') => {
    if (!text || !text.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await analyzeMessage(text, sender);
      setAnalysisResult(res);
    } catch (e) {
      console.error('Analysis failed:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectBenchmark = (bm) => {
    setActiveBenchmarkId(bm.id);
    setInputText(bm.message);
    setSenderHeader(bm.sender);
    executeAnalysis(bm.message, bm.sender);
  };

  const handleCustomAnalyze = (text) => {
    setActiveBenchmarkId(null);
    executeAnalysis(text, senderHeader);
  };

  const handleReset = () => {
    setInputText('');
    setSenderHeader('');
    setActiveBenchmarkId(null);
    setAnalysisResult(null);
  };

  const handleLoadSpecificTest = (testId) => {
    const found = BENCHMARKS_DATA.find(b => b.id === testId);
    if (found) {
      handleSelectBenchmark(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenModal={(modalName) => setActiveModal(modalName)}
        backendStatus={backendStatus}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Hero Section */}
        <HeroSection />

        {/* 1-Click Evaluation Benchmark Chips for Judges (Slide 6 & 7) */}
        <BenchmarkChips
          onSelectBenchmark={handleSelectBenchmark}
          activeBenchmarkId={activeBenchmarkId}
        />

        {/* Main 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Input Scanner + Highlighting + Scoring (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <MessageScanner
              inputText={inputText}
              setInputText={setInputText}
              senderHeader={senderHeader}
              setSenderHeader={setSenderHeader}
              onAnalyze={handleCustomAnalyze}
              isAnalyzing={isAnalyzing}
              onReset={handleReset}
            />

            {analysisResult && (
              <>
                {/* Engine 02: In-Text Highlighting */}
                <HighlightingEngine
                  cleanText={analysisResult.cleanText}
                  findings={analysisResult.findings || []}
                />

                {/* Engine 03: Transparent Scoring Table */}
                <ScoringBreakdown
                  pointsBreakdown={analysisResult.pointsBreakdown}
                  findings={analysisResult.findings}
                  totalScore={analysisResult.score}
                />
              </>
            )}
          </div>

          {/* Right Column: Speedometer Gauge + Emergency Action Hub (5 cols) */}
          <div className="lg:col-span-5 space-y-6 sticky top-20">
            {/* Speedometer Risk Gauge (Slide 7) */}
            <RiskGauge
              score={analysisResult ? analysisResult.score : 0}
              riskTier={analysisResult ? analysisResult.riskTier : 'LOW'}
              latencyMs={analysisResult ? analysisResult.latencyMs : 0.8}
            />

            {/* Engine 04: Safe Action & Rescue Hub (Slide 3, 6, 7) */}
            {analysisResult && (
              <EmergencyActionHub
                riskTier={analysisResult.riskTier}
                actions={analysisResult.actions || []}
                reportDraft={analysisResult.reportDraft}
                onOpenReportModal={() => setActiveModal('report')}
                onOpenBankModal={() => setActiveModal('banks')}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onOpenModal={(modalName) => setActiveModal(modalName)} />

      {/* Modals */}
      {activeModal === 'banks' && (
        <BankDirectoryModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'threats' && (
        <ThreatIntelligenceLiveFeed onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'falsePositive' && (
        <FalsePositiveShowcase
          onClose={() => setActiveModal(null)}
          onLoadTest={handleLoadSpecificTest}
        />
      )}

      {activeModal === 'monetization' && (
        <MonetizationModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'architecture' && (
        <ArchitectureModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'report' && analysisResult && (
        <IncidentReportModal
          reportDraft={analysisResult.reportDraft}
          score={analysisResult.score}
          message={analysisResult.cleanText}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
