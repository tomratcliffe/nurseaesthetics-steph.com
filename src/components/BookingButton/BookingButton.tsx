import { Cta } from '../Cta/Cta';
import { site } from '../../content';

type Props = {
  /** Outline sits on the cream nav overlay, where a solid block is too heavy. */
  variant?: 'solid' | 'outline';
  label?: string;
  onClick?: () => void;
};

/** The booking call to action, wherever it appears. */
export function BookingButton({ variant = 'solid', label, onClick }: Props) {
  return (
    <Cta href={site.bookingUrl} variant={variant} onClick={onClick}>
      {label ?? site.bookingLabel}
    </Cta>
  );
}
