import { PortfolioExperience } from './components/experience/PortfolioExperience';
import { ReducedMotionProvider } from './components/experience/ReducedMotionProvider';
import { portfolioData } from './data/portfolioData';

export default function App() {
  return (
    <ReducedMotionProvider>
      <PortfolioExperience data={portfolioData} />
    </ReducedMotionProvider>
  );
}
