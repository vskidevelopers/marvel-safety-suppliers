import { Fragment } from "react";

/**
 * Product descriptions are stored as plain text but may use light markdown:
 * "**bold**" for emphasis, "- item" for bullet lines, "## Heading" for
 * sub-headings. This keeps the admin product form a single textarea while
 * still letting the detail page render something more scannable than one
 * dense paragraph.
 */

function renderInline(line: string, keyPrefix: string) {
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return parts.map((part, i) =>
        i % 2 === 1 ? (
            <strong key={`${keyPrefix}-${i}`} className="font-semibold text-gray-900">
                {part}
            </strong>
        ) : (
            <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>
        )
    );
}

export function FormattedText({ text }: { text: string }) {
    if (!text?.trim()) return null;

    const lines = text.split("\n").map((l) => l.trim());
    const blocks: React.ReactNode[] = [];
    let bulletBuffer: string[] = [];

    const flushBullets = (key: string) => {
        if (bulletBuffer.length === 0) return;
        blocks.push(
            <ul key={key} className="list-disc pl-5 space-y-1.5 my-3">
                {bulletBuffer.map((item, i) => (
                    <li key={i} className="text-gray-700">
                        {renderInline(item, `${key}-${i}`)}
                    </li>
                ))}
            </ul>
        );
        bulletBuffer = [];
    };

    lines.forEach((line, index) => {
        if (!line) {
            flushBullets(`ul-${index}`);
            return;
        }
        if (line.startsWith("- ")) {
            bulletBuffer.push(line.slice(2));
            return;
        }
        flushBullets(`ul-${index}`);
        if (line.startsWith("## ")) {
            blocks.push(
                <h4 key={index} className="font-bold text-gray-900 mt-4 mb-1.5">
                    {renderInline(line.slice(3), `h-${index}`)}
                </h4>
            );
        } else {
            blocks.push(
                <p key={index} className="text-gray-700 mb-2 last:mb-0">
                    {renderInline(line, `p-${index}`)}
                </p>
            );
        }
    });
    flushBullets("ul-end");

    return <div>{blocks}</div>;
}

/** Plain-text preview for the above-the-fold teaser — strips markdown markers. */
export function stripFormatting(text: string): string {
    if (!text) return "";
    return text
        .split("\n")
        .map((line) =>
            line
                .trim()
                .replace(/^##\s+/, "")
                .replace(/^-\s+/, "")
                .replace(/\*\*(.+?)\*\*/g, "$1")
        )
        .filter(Boolean)
        .join(" ");
}

/**
 * Above-the-fold teaser that always ends on a complete sentence — never
 * mid-word or mid-sentence. Always includes at least the first sentence in
 * full (however long), then adds a second only if it fits within maxChars;
 * otherwise it stops rather than slicing into it.
 */
export function getTeaser(text: string, maxSentences = 2, maxChars = 260): string {
    const plain = stripFormatting(text);
    if (!plain) return "";

    const sentences = plain.match(/[^.!?]+[.!?]+(?:\s+|$)/g)?.map((s) => s.trim());
    if (!sentences?.length) return plain;

    let result = sentences[0];
    for (let i = 1; i < Math.min(maxSentences, sentences.length); i++) {
        const candidate = `${result} ${sentences[i]}`;
        if (candidate.length > maxChars) break;
        result = candidate;
    }

    return result;
}
