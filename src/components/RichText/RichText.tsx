import type { Paragraph } from '../../content';

/**
 * Renders a paragraph that may contain inline links. Plain strings stay plain;
 * an array is a run of text fragments and links, so copy can link a word
 * mid-sentence without embedding markup in the content file.
 */
export function RichText({ paragraph }: { paragraph: Paragraph }) {
  if (typeof paragraph === 'string') return <>{paragraph}</>;

  return (
    <>
      {paragraph.map((part, index) => {
        if (typeof part === 'string') return part;

        // mailto: and tel: links stay in the current tab; the rest open away
        // from the site and need the usual rel protection.
        const inPage = /^(?:mailto:|tel:|#)/.test(part.href);

        return (
          <a
            key={`${part.href}-${index}`}
            href={part.href}
            {...(!inPage && { target: '_blank', rel: 'noopener noreferrer' })}
          >
            {part.text}
            {inPage ? null : <span className="visually-hidden"> (opens in a new tab)</span>}
          </a>
        );
      })}
    </>
  );
}
