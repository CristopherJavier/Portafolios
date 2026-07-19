import { PortfolioExperience } from './components/experience/PortfolioExperience';
import { portfolioData } from './data/portfolioData';

export default function App() {
  return (
    <PortfolioExperience data={portfolioData} />
  );
}
