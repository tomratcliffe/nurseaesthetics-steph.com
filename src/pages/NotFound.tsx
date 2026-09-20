import { Link } from 'react-router-dom';
import { Section } from '../components/Section/Section';

export function NotFound() {
  return (
    <Section eyebrow="404" heading="Page not found" headingLevel="h1" narrow>
      <p>
        That page does not exist. <Link to="/">Return to the homepage</Link>, or{' '}
        <Link to="/treatments">browse the treatments</Link>.
      </p>
    </Section>
  );
}
